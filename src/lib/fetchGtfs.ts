// src/lib/fetchGtfs.ts
import { transit_realtime } from 'gtfs-realtime-bindings';
import fetch from 'node-fetch';

export async function fetchGtfsRealtimeData(stopId: string): Promise<string[]> {
    const url = 'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs';
    const res = await fetch(url);

    // Log status and headers
    console.log("Response status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));

    const buffer = await res.arrayBuffer();
    const text = Buffer.from(buffer).toString("utf-8");
    console.log("First 200 chars of response:", text.slice(0, 200));

    const feed = transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
    console.log("Feed entity count:", feed.entity.length);
    
    // Debug: Log all stop IDs we find in the feed
    const allStopIds = new Set<string>();
    let stopUpdatesFound = 0;
    
    for (const entity of feed.entity) {
        const stopUpdates = entity.tripUpdate?.stopTimeUpdate ?? [];
        stopUpdatesFound += stopUpdates.length;
        
        for (const update of stopUpdates) {
            if (update.stopId) {
                allStopIds.add(update.stopId);
            }
        }
    }
    
    console.log("Total stopTimeUpdates found:", stopUpdatesFound);
    console.log("All unique stop IDs in feed:", Array.from(allStopIds).slice(0, 20)); // Show first 20
    console.log("Looking for stopId:", stopId);
    console.log("Is our stopId in the feed?", allStopIds.has(stopId));

    const arrivals: number[] = [];

    for (const entity of feed.entity) {
        const stopUpdates = entity.tripUpdate?.stopTimeUpdate ?? [];
        for (const update of stopUpdates) {
            if (update.stopId === stopId) {
                console.log("Found matching stopId! Update:", update);
                const time = update.arrival?.time ?? update.departure?.time;
                console.log("Extracted time:", time, "Type:", typeof time);
                
                // Handle Long objects from protobuf
                let timeNumber: number | null = null;
                if (typeof time === "number") {
                    timeNumber = time;
                } else if (time && typeof time === "object" && "low" in time) {
                    // This is a Long object, convert to number
                    timeNumber = Number(time.low);
                }
                
                console.log("Converted time to number:", timeNumber);
                if (timeNumber !== null) {
                    arrivals.push(timeNumber * 1000);
                    console.log("Added time to arrivals:", timeNumber * 1000);
                }
            }
        }
    }

    console.log("Final arrivals array (timestamps):", arrivals);

    // Return sorted, formatted times
    const formattedArrivals = arrivals
        .sort()
        .map((timestamp) => new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    
    console.log("Formatted arrivals:", formattedArrivals);
    return formattedArrivals;
}

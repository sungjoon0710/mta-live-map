// app/123/1/page.tsx
import { fetchGtfsRealtimeData } from '@/lib/fetchGtfs';
import { UptownStationArrivals } from '@/components/stationArrivals/UptownStationArrivals';
import { DowntownStationArrivals } from '@/components/stationArrivals/DowntownStationArrivals';

export default async function Page() {
  const downtownStopId = '117S'; // 116th St, downtown 1 train
  const uptownStopId = '117N'; // 1116th St, uptown 1 train
  const downtownArrivals = await fetchGtfsRealtimeData(downtownStopId);
  const uptownArrivals = await fetchGtfsRealtimeData(uptownStopId);


  return (
    <main>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--red)', gap: '2rem' }}>
            <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>1 train</h1>
            <DowntownStationArrivals arrivals={downtownArrivals} />
            <UptownStationArrivals arrivals={uptownArrivals} />
        </div>
    </main>
  );
}

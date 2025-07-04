export function DowntownStationArrivals({ arrivals }: { arrivals: string[] }) {

    if (arrivals.length === 0) {
      return (
        <>
          <p className="text-white">No upcoming arrivals found.</p>
          <pre style={{ color: "red" }}>{JSON.stringify(arrivals, null, 2)}</pre>
        </>
      );
    }
  
    return (
      <ul>
        {arrivals.map((time, index) => (
          <li className="text-white" key={index}>Next Uptown 1 Train: {time}</li>
        ))}
      </ul>
    );
}
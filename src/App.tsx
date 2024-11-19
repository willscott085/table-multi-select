import StatusBadge from "./components/status-badge";
import Table from "./components/table";

const renderRules = new Map();

renderRules.set("status", (colValue: string) => (
  <StatusBadge className="capitalize" isActive={colValue === "available"}>
    {colValue}
  </StatusBadge>
));

function App() {
  return (
    <main className="container mx-auto flex justify-center items-center max-w-[1200px] h-screen">
      <div>
        <Table
          data={[
            {
              name: "smss.exe",
              device: "Mario",
              path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
              status: "scheduled",
            },

            {
              name: "netsh.exe",
              device: "Luigi",
              path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
              status: "available",
            },

            {
              name: "uxtheme.dll",
              device: "Peach",
              path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
              status: "available",
            },

            {
              name: "aries.sys",
              device: "Daisy",
              path: "\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys",
              status: "scheduled",
            },

            {
              name: "cryptbase.dll",
              device: "Yoshi",
              path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
              status: "scheduled",
            },

            {
              name: "7za.exe",
              device: "Toad",
              path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
              status: "scheduled",
            },
          ]}
          renderRules={renderRules}
        />
      </div>
    </main>
  );
}

export default App;

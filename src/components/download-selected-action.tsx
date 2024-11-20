import { DownloadSimple, Warning } from "@phosphor-icons/react";

type Props = {
  selectedItems: string[];
  deselectItems: (ids: string[]) => void;
  dataMap: Map<string, Record<string, string>>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export default function DownloadSelectedAction(props: Props) {
  const { selectedItems, deselectItems, dataMap, onMouseEnter, onMouseLeave } =
    props;

  const areAllSelectedItemsDownloadable = selectedItems.every((id) => {
    const item = dataMap.get(id);

    return item?.status === "available";
  });

  const handleDownloadAction = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one downloadable item.");
      return;
    }

    onMouseLeave();

    if (!areAllSelectedItemsDownloadable) {
      const { availableItems, unavailableItems } = selectedItems.reduce<{
        availableItems: string[];
        unavailableItems: string[];
      }>(
        (acc, id) => {
          const item = dataMap.get(id);
          if (item?.status === "available") {
            acc.availableItems.push(id);
          } else {
            acc.unavailableItems.push(id);
          }

          return acc;
        },
        {
          availableItems: [],
          unavailableItems: [],
        }
      );

      deselectItems(unavailableItems);

      setTimeout(
        () =>
          alert(
            availableItems.length > 0
              ? availableItems
                  .map((id) => {
                    const item = dataMap.get(id)!;
                    return `${item.path} | ${item.device}\n`;
                  })
                  .join("")
              : "All items have been excluded. Please select at least one downloadable item."
          ),
        0
      );
    } else {
      alert(
        selectedItems
          .map((id) => {
            const item = dataMap.get(id)!;
            return `${item.path} | ${item.device}\n`;
          })
          .join("")
      );
    }
  };

  return (
    <div className="group relative">
      <button
        data-testid="download-selected-action"
        data-tooltip-target="unavailable-items-tooltip"
        aria-labelledby="unavailable-items-tooltip"
        type="button"
        className="flex gap-2 items-center peer"
        onClick={handleDownloadAction}
        {...(!areAllSelectedItemsDownloadable && {
          onMouseEnter,
          onMouseLeave,
        })}
      >
        {areAllSelectedItemsDownloadable ? (
          <DownloadSimple size={22} />
        ) : (
          <Warning size={22} color="red" />
        )}
        Download Selected
      </button>

      {!areAllSelectedItemsDownloadable && (
        <div
          id="unavailable-items-tooltip"
          role="tooltip"
          data-testid="unavailable-items-tooltip"
          className="peer-focus:scale-100 group-hover:scale-100 absolute z-10 scale-0 inline-block px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm"
        >
          Some selected items cannot be downloaded, click to exlude unavailable
          items.
        </div>
      )}
    </div>
  );
}

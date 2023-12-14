import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./style.scss";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import { breakpoints, cols, gridLayouts } from "./layout";
import { TileKeys } from "../../definitions/enums";
import UtilityOverviewContent from "./utilityOverviewContent";
import { Ref, RefObject, createRef, memo, useEffect, useState } from "react";
import { TileWithTableMethods } from "../../components/tile/tileWithTable";
import CalculationsPerUtilityContent from "./calculationsPerUtilityContent";
import RTOPerUtility from "./rtoPerUtility";
import EBoksContent from "./eBoksContent";
import { fetchDashboardLayout, changeDashboardLayout } from "../../services/api";
import { useAuthentication } from "../../hooks/useAuthentication";

const initialTiles = [
  {
    key: TileKeys.utilityOverview,
    content: (ref: Ref<TileWithTableMethods>) => <UtilityOverviewContent ref={ref} />
  },
  {
    key: TileKeys.calculationsPerUtility,
    content: (ref: Ref<TileWithTableMethods>) => <CalculationsPerUtilityContent ref={ref} />
  },
  {
    key: TileKeys.RTOPerUtility,
    content: (ref: Ref<TileWithTableMethods>) => <RTOPerUtility ref={ref} />
  },
  {
    key: TileKeys.eBoks,
    content: <EBoksContent />
  }
];

const Dashboard = memo(() => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const { userId } = useAuthentication();
  const arrLength = initialTiles.length;
  const [layouts, setLayouts] = useState<Layouts>(gridLayouts);
  const [elRefs, setElRefs] = useState<Ref<TileWithTableMethods>[]>([]);

  useEffect(() => {
    setElRefs((elRefs) =>
      Array(arrLength)
        .fill(elRefs)
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [arrLength]);

  useEffect(() => {
    const getLayouts = async () => {
      if (userId) {
        const receivedLayout = await fetchDashboardLayout(userId);
        setLayouts(receivedLayout);
      }
    };
    getLayouts();
  }, [userId]);

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={150}
        isDraggable
        draggableHandle=".drag-handle"
        isResizable
        resizeHandles={["se"]}
        onLayoutChange={(_layout, layouts) => {
          elRefs.forEach((elRef) => {
            if (elRef) {
              const ref = elRef as RefObject<TileWithTableMethods>;
              ref.current?.changeTableHeight();
            }
          });
          changeDashboardLayout(userId, layouts);
        }}
      >
        {initialTiles.map((tile, i) => (
          <div key={tile.key}>
            {typeof tile.content === "function" ? tile.content(elRefs[i]) : tile.content}
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
});

export default Dashboard;

import stageStyles from "../styles/stage.module.css";
import { request } from "../../../../../api/request";
import { ADD_BOARD_TIME_INVEST_RATE } from "../../../../../api/api";
import { useMemo } from "react";
import { useCurrentUser } from "../../../../../hooks/useCurrentUser";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

enum BoardRateEnum {
  LEVEL_ONE = 1,
  LEVEL_TWO,
  LEVEL_THREE,
  LEVEL_FOUR,
  LEVEL_FIVE,
}

const rateMap: any = {
  [BoardRateEnum.LEVEL_ONE]: {
    description: "1 — Definitely not worth our time",
    color: "light_grey",
  },
  [BoardRateEnum.LEVEL_TWO]: {
    description: "2 — Probably not worth our time",
    color: "grey",
  },
  [BoardRateEnum.LEVEL_THREE]: {
    description: "3 — Worth our time",
    color: "light_green",
  },
  [BoardRateEnum.LEVEL_FOUR]: {
    description: "4 — A good use of our time",
    color: "green",
  },
  [BoardRateEnum.LEVEL_FIVE]: {
    description: "5 — An excellent use of our time",
    defaultChecked: true,
    color: "heavy_green",
  },
};

export const TimeInvest = ({ retro }: any) => {
  const onSubmit = async (e: any) => {
    e.preventDefault();

    const rates = e.target.rate;

    const selectedRate: any = Object.values(rates).find(
      (rate: any) => rate.checked
    );

    if (!selectedRate) {
      return;
    }

    await request.post(ADD_BOARD_TIME_INVEST_RATE, {
      retroId: retro.id,
      rate: Number(selectedRate.value),
    });
  };

  const { user } = useCurrentUser();

  const hasRated = useMemo(() => {
    return !!retro?.boardTimeInvests?.find((s: any) => s.userId === user?.id);
  }, [retro?.boardTimeInvests, user]);

  const barData = useMemo(() => {
    const map: any = {
      [BoardRateEnum.LEVEL_ONE]: 0,
      [BoardRateEnum.LEVEL_TWO]: 0,
      [BoardRateEnum.LEVEL_THREE]: 0,
      [BoardRateEnum.LEVEL_FOUR]: 0,
      [BoardRateEnum.LEVEL_FIVE]: 0,
    };
    retro?.boardTimeInvests?.forEach((invest: any) => {
      if (map[invest.rate]) {
        map[invest.rate] += 1;
      } else {
        map[invest.rate] = 1;
      }
    });

    return Object.keys(map).map((key: any) => ({
      argument: `${key} Star`,
      value: map[key],
    }));
  }, [retro?.boardTimeInvests]);

  const renderBarGraph = useMemo(() => {
    return (
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Chart height={300} width={600} data={barData}>
          <p className="data__detail">Number of People</p>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="value"
            argumentField="argument"
            barWidth={0.7}
          />
        </Chart>
      </div>
    );
  }, [barData]);

  return (
    <div style={{ width: "80%" }}>
      <div style={{ height: 150 }}>
        <div style={{ textAlign: "center" }} className="heading">
          Return on Time Invested
        </div>
        {hasRated ? null : (
          <>
            <div style={{ marginBottom: 10 }}>
              Reflect on your retro! Was this retro worth our time? Rate the
              retro 1–5. Be honest—it’s anonymous!
            </div>
            <div style={{ marginBottom: 18 }}>
              Once everyone has selected a rating, the facilitator will reveal
              the results.
            </div>
          </>
        )}
      </div>
      <div style={{ zIndex: 100, width: "100%" }}>
        {hasRated ? (
          renderBarGraph
        ) : (
          <form onSubmit={onSubmit}>
            {Object.keys(rateMap).map((key) => {
              return (
                <div
                  key={key}
                  // @ts-ignore
                  className={`${stageStyles.rate__box_section} ${
                    stageStyles[`rate__box_section_${rateMap[key].color}`]
                  }`}
                >
                  <input
                    style={{ marginRight: "10px" }}
                    name="rate"
                    type="radio"
                    defaultChecked={rateMap[key].defaultChecked}
                    value={key}
                  />
                  <label>{rateMap[key].description}</label>
                  <br />
                </div>
              );
            })}
            <button className={stageStyles.rate__submit_button} type="submit">
              Submit
            </button>
            <span>
              {retro?.boardTimeInvests?.length ?? 0} participants have voted
            </span>
          </form>
        )}
      </div>
    </div>
  );
};

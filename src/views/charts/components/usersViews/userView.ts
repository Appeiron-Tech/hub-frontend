import { reactive } from "vue";
import ChartServices from "@/views/charts/service/chart.services";
import type {
  IAnalyticsCountryRegionResponse,
  IAnalyticsForCharts,
  IAnalyticsResponse,
} from "@/views/charts/models/ICharts";
import { Loading, QSpinnerFacebook, QSpinnerGears, QSpinnerPie } from "quasar";

export class UserViewController {
  containerId: string | undefined = undefined;
  private _analyticsInformation: IAnalyticsResponse | undefined = undefined;
  chartService: ChartServices = new ChartServices();
  private _showDialog = false;
  private _chartInformation?: IAnalyticsForCharts | any = undefined;
  private _chartInformationForUsers?: IAnalyticsForCharts | any = undefined;
  private _chartInformationForSessions?: IAnalyticsForCharts | any = undefined;
  private _analyticsInformationForSelectedCountry:
    | IAnalyticsCountryRegionResponse
    | undefined = undefined;
  private _showLoadingAnimation: boolean;

  constructor() {
    this._showLoadingAnimation = false;
  }

  set AnalyticsInformationForSelectedCountry(
    value: IAnalyticsCountryRegionResponse | any
  ) {
    this._analyticsInformationForSelectedCountry = value;
  }

  set Dialog(value: boolean) {
    this._showDialog = value;
  }
  get chartInformationForUsers(): IAnalyticsForCharts | any {
    return this._chartInformationForUsers;
  }

  get chartInformationForSessions(): IAnalyticsForCharts | any {
    return this._chartInformationForSessions;
  }

  get analyticsInformation(): IAnalyticsResponse | undefined {
    return this._analyticsInformation;
  }

  get chartInformation(): any {
    return this._chartInformation;
  }

  get analyticsInformationForSelectedCountry():
    | IAnalyticsCountryRegionResponse
    | undefined {
    return this._analyticsInformationForSelectedCountry;
  }

  set showDialog(value: boolean) {
    this._showDialog = value;
  }

  get showDialog(): boolean {
    return this._showDialog;
  }

  get showLoadingAnimation(): boolean {
    return this._showLoadingAnimation;
  }

  set showLoadingAnimation(value: boolean) {
    this._showLoadingAnimation = value;
  }

  async loadInfo() {
    this._analyticsInformation =
      await this.chartService.getUsersViewsByCountry();
    this._chartInformation = Object.assign(
      [],
      this._analyticsInformation.countries.map((e) => {
        return [e.name, Number(e.pageViews)];
      })
    );
    this._chartInformationForSessions = Object.assign(
      [],
      this._analyticsInformation.countries.map((e) => {
        return [e.name, Number(e.sessions)];
      })
    );

    this._chartInformationForUsers = Object.assign(
      [],
      this._analyticsInformation.countries.map((e) => {
        return [e.name, Number(e.users)];
      })
    );
  }

  getChartInformationByCategorie(categorySelected: string) {
    switch (categorySelected) {
      case "views":
        return this._analyticsInformation!.countries.map((e: any) => {
          return [e.name, Number(e.pageViews)];
        });
      case "users":
        return this._chartInformationForUsers;
      case "sessions":
        return this._analyticsInformation!.countries.map((e: any) => {
          return [e.name, Number(e.sessions)];
        });
      default:
        return this._chartInformation;
    }
  }
  getChartOptions(categorySelected: string) {
    return {
      title: {
        text:
          categorySelected[0].toLocaleUpperCase() +
          categorySelected.slice(1, -1),
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          type: "pie",
          allowPointSelect: true,
          keys: ["name", "y"],
          data: this.getChartInformationByCategorie(categorySelected),
          showInLegend: true,
          events: {
            click: async (event: any) => {
              Loading.show({
                spinner: QSpinnerPie,
                spinnerSize: 140,
                spinnerColor: "blue",
                message: '<br/><span class="text-primary">Cargando...</span>',
                html: true,
              });
              this._showLoadingAnimation = true;
              console.log(event.point.name);
              this._analyticsInformationForSelectedCountry = structuredClone(
                await this.chartService.getUsersViewsByCountryAndDate(
                  event.point.name,
                  "2022-05-24"
                )
              );
              this._showDialog = true;
              Loading.hide();
            },
          },
        },
      ],
      legend: {
        maxHeight: 90,
      },
      chart: {
        animation: {
          duration: 1000,
        },
      },
    };
  }
}

const userViewController = reactive(new UserViewController());
export default userViewController;

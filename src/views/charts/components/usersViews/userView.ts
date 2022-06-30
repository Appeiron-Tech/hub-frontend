import {reactive} from "vue";
import ChartServices from "@/views/charts/service/chart.services";
import type {
  IAnalyticsCountryRegionResponse,
  IAnalyticsForCharts,
  IAnalyticsResponse
} from "@/views/charts/models/ICharts";
import {Loading, QSpinnerFacebook, QSpinnerGears, QSpinnerPie} from "quasar";

export class UserViewController {
  containerId: string | undefined = undefined;
  private _analyticsInformation: IAnalyticsResponse | undefined = undefined;
  chartService: ChartServices = new ChartServices();
  private _showDialog = false;
  private _chartInformation?: IAnalyticsForCharts | any = undefined;
  private _analyticsInformationForSelectedCountry: IAnalyticsCountryRegionResponse | undefined = undefined;
  private _showLoadingAnimation: boolean;

  constructor() {
    this._showLoadingAnimation = false;
  }


  get analyticsInformation(): IAnalyticsResponse | undefined {
    return this._analyticsInformation;
  }

  get chartInformation(): any {
    return this._chartInformation;
  }

  get analyticsInformationForSelectedCountry(): IAnalyticsCountryRegionResponse | undefined {
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

  async loadInfo(){
    this._analyticsInformation = await this.chartService.getUsersViewsByCountry();
    this._chartInformation = Object.assign([], this._analyticsInformation.countries.map(e => {
      return [e.name, Number(e.pageViews)];
    }))
    console.log("%c⧭", "color: #cc0088", this._analyticsInformation);
    console.log("%c⧭", "color: #cc0088", "ya pa causi -> "+this._chartInformation);
  }
  getChartOptions() {
      return {
        title: {
          text: 'Payasito'
        },
        credits: {
          enabled: false,
        },
        series: [{
          type: 'pie',
          allowPointSelect: true,
          keys: ['name', 'y'],
          data: this._chartInformation,
          showInLegend: true,
          events:{
            click: async (event: any) => {
              Loading.show({
                spinner: QSpinnerPie,
                spinnerSize: 140,
                spinnerColor: 'blue',
                message: '<br/><span class="text-primary">Cargando...</span>',
                html: true
              })
              this._showLoadingAnimation = true;
              console.log(event.point.name);
              this._analyticsInformationForSelectedCountry =  structuredClone(await this.chartService.getUsersViewsByCountryAndDate(event.point.name, "2022-05-24"));
              this._showDialog = true;
              Loading.hide()
            }
          }
        }]
      }
  }
}

const userViewController = reactive( new UserViewController());
export default userViewController;
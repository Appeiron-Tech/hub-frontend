import {reactive} from "vue";
import ChartServices from "@/views/charts/service/chart.services";
import type {IAnalyticsForCharts, IAnalyticsResponse} from "@/views/charts/models/ICharts";

export class UserViewController {
  containerId: string | undefined = undefined;
  analyticsInformation: IAnalyticsResponse | undefined = undefined;
  chartService: ChartServices = new ChartServices();
  private _showDialog = false;
  chartInformation?: IAnalyticsForCharts | any = undefined;

  constructor() {
  }


  set showDialog(value: boolean) {
    this._showDialog = value;
  }

  get showDialog(): boolean {
    return this._showDialog;
  }

  async loadInfo(){
    this.analyticsInformation = await this.chartService.getUsersViewsByCountry();
    this.chartInformation = Object.assign([], this.analyticsInformation.countries.map(e => {
      return [e.country, Number(e.pageViews)];
    }))
    console.log("%c⧭", "color: #cc0088", this.analyticsInformation);
    console.log("%c⧭", "color: #cc0088", "ya pa causi -> "+this.chartInformation);
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
          data: this.chartInformation,
          showInLegend: true,
          events:{
            click: (event: any) => {
              console.log(event);
              this._showDialog = true;
            }
          }
        }]
      }
  }
}

const userViewController = reactive( new UserViewController());
export default userViewController;
import { Component, OnInit } from '@angular/core';

import { ChartType } from './apex.model';
import { CommandesService } from '../../../core/services/commandes.service';

import {
  columnlabelChart
} from './data';

@Component({
  selector: 'app-apex',
  templateUrl: './apex.component.html',
  styleUrls: ['./apex.component.scss']
})

/**
 * Apex-chart component
 */
export class ApexComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;

  columnlabelChart: ChartType;

  user: any;
  commandes: any[] = [];
  total: number[] = [];
  totalOfMonths : string[] = [];
  constructor(private cmdService: CommandesService) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Charts' }, { label: 'Apex charts', active: true }];


    this.user = JSON.parse(localStorage.getItem('userInfo'));
    this.getCommandes(this.user.id)
    /**
     * Fethches the chart data
     */
    this._fetchData();
  }

  getCommandes(id: string) {
    // console.log(id);

    this.cmdService.getAllCommandes().subscribe(data => {
      // console.log(data)
      this.commandes = data.map(fav => {
        // console.log(fav);
        return {

          uid: fav.payload.doc.id,

          ...fav.payload.doc.data() as {}
        }
      })
      // this.orders$ = this.commandes
      // console.log('Liste de commandes : ',this.commandes);
      let groupKey = 0;
      let groups = this.commandes.reduce(function (r, o) {
        var m = o.date.split(('-'))[1];
        (r[m]) ? r[m].data.push(o) : r[m] = { group: String(groupKey++), data: [o] };
        return r;
      }, {});
      // console.log('Les groupes', groups)

      var result = Object.keys(groups).map(function (k) { return groups[k]; });
      // console.log((result));

      result.forEach(element => {
        // console.log(element.data[0].date);
        let date = new Date(element.data[0].date);
        const nameOfMonth = date.toLocaleString('default', {
          month: 'long',
        });
        // console.log(nameOfMonth);
        let sum = 0;
        for (let index = 0; index < element.data.length; index++) {
          sum += element.data[index].total;
        }
        // console.log(nameOfMonth, '||', sum);
        this.total.push(sum)
        this.totalOfMonths.push(nameOfMonth)

      })

    })

  }

  /**
   * Fetches the chart data
   */
  private _fetchData() {
    this.columnlabelChart = columnlabelChart;
    this.columnlabelChart.series[0].data = this.total
    this.columnlabelChart.xaxis.categories = this.totalOfMonths
    console.log(columnlabelChart)
  }
}

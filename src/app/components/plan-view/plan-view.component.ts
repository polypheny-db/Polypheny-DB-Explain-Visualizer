import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {IPlan} from '../../models/iplan';
import {HighlightType, ViewMode} from '../../models/enums';
import {PlanService} from '../../services/plan-service';

@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrls: ['./plan-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanViewComponent implements OnInit {

  id: string;
  plan: IPlan;
  rootContainer: any;
  hideMenu = true;
  editName = false;
  @Input() query;
  @Input() planObject;

  viewOptions: any = {
    showPlanStats: true,
    showHighlightBar: true,
    showPlannerEstimate: true,
    showTags: true,
    highlightType: HighlightType.NONE,
    viewMode: ViewMode.FULL
  };

  showPlannerEstimate = true;
  showMenu = false;

  highlightTypes = HighlightType; // exposing the enum to the view
  viewModes = ViewMode;

  constructor( private _planService: PlanService ) {

  }

  initPlan() {
    this.plan = this._planService.createPlan( 'name', this.planObject, this.query);

    this.rootContainer = this.plan.content;
    this.plan.planStats = {
      executionTime: this.rootContainer['Execution Time'] || this.rootContainer['Total Runtime'],
      planningTime: this.rootContainer['Planning Time'] || 0,
      maxRows: this.rootContainer[this._planService.MAXIMUM_ROWS_PROP] || 0,
      maxCost: this.rootContainer[this._planService.MAXIMUM_COSTS_PROP] || 0,
      maxDuration: this.rootContainer[this._planService.MAXIMUM_DURATION_PROP] || 0
    };
  }

  ngOnInit() {
    this.initPlan();
  }

  toggleHighlight(type: HighlightType) {
    this.viewOptions.highlightType = type;
  }

  analyzePlan() {
    this._planService.analyzePlan(this.plan);
  }

}

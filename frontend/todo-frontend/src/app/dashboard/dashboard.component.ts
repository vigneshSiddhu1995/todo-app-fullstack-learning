import { Component, OnInit  } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

interface DashboardStats {
  totalTodos: number;
  completedTodos: number;
  pendingTodos: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardStats: DashboardStats | null = null;
  
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardStats();
  }

  private loadDashboardStats() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res: DashboardStats) => {
        this.dashboardStats = res;
        console.log('Dashboard Stats loaded:', res);
      },
      error: (err) => {
        console.error('Failed to load dashboard stats:', err);
      }
    });
  }
}

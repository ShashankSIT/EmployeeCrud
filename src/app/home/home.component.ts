import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DepartmentService } from '../Service/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private service: DepartmentService) { }

  CurrentRoute: any;
  SalaryInfo: any;
  UserName: any;
  isClassAdded: any;
  isClassAdded2 = false;

  ngOnInit(): void {
    this.loadChart();
  }

  @ViewChild('lineChartCanvas') lineChartCanvas: any;
  @ViewChild('PieChartCanvas') PieChartCanvas: any;

  loadChart(): void {
    this.service.SalaryChart().subscribe((item: any) => {
      this.SalaryInfo = item.data;
      
      const ctx = this.lineChartCanvas?.nativeElement.getContext('2d');
      const ctx2 = this.PieChartCanvas?.nativeElement.getContext('2d');

      var gradientStroke1 = ctx?.createLinearGradient(0, 350, 0, 50);
      gradientStroke1?.addColorStop(1, 'rgba(94, 114, 228, 0.2)');
      gradientStroke1?.addColorStop(0.2, 'rgba(94, 114, 228, 0.0)');
      gradientStroke1?.addColorStop(0, 'rgba(164, 194, 228, 0)');

      var gradientStroke2 = ctx?.createLinearGradient(0, 350, 0, 50);
      gradientStroke2?.addColorStop(1, 'rgba(255, 99, 132, 0.2)');
      gradientStroke2?.addColorStop(0.2, 'rgba(255, 99, 132, 0.08)');
      gradientStroke2?.addColorStop(0, 'rgba(255, 99, 132, 0.05)');

      Chart?.register(...registerables);

      const labels = this.SalaryInfo.map((i: { empDepartment: any; }) => i.empDepartment);
      const data = this.SalaryInfo.map((i: { totalSalary: any; }) => i.totalSalary);
      const data2 = this.SalaryInfo.map((i: { averageSalary: any; }) => i.averageSalary);
      const data3 = this.SalaryInfo.map((i: { empCount: any; }) => i.empCount);
      const colors = ['#F56565', '#fd7e14', '#FBD38D', '#81E6D9', '#20c997', '#596CFF', '#6f42c1', '#d63384', '#63B3ED', '#0dcaf0'];

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                let label = context.label || '';
                if (label) {
                  label = context.parsed > 1 ? label += ' : ' + context.parsed + ' Employees' : label += ' : ' + context.parsed + ' Employee';
                }
                return label;
              },
            },
          },
        },
      };

      new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Salary',
              data: data3,
              backgroundColor: colors,
              borderColor: '#FFF',
              borderWidth: 1,
            },
          ],
        },
        options: options,
      });



      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Salary',
              tension: 0.4,
              data: data,
              backgroundColor: gradientStroke1,
              fill: true,
              borderColor: '#5e72e4',
              borderWidth: 2.5,
            },
            {
              label: 'Average Salary',
              tension: 0.4,
              data: data2,
              backgroundColor: gradientStroke2,
              fill: true,
              borderColor: '#F56565',
              borderWidth: 2.5,
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    });
  }
}

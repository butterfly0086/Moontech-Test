import { Component, OnInit } from '@angular/core';
import { LogService } from '../_services/log.service';

interface ConnectionLog {
  _id?: string;
  date: Date;
  user: {
    username: string
  },
  logIn: boolean;
}

@Component({
  selector: 'app-connection-logs',
  templateUrl: './connection-logs.component.html',
  styleUrl: './connection-logs.component.css'
})
export class ConnectionLogsComponent implements OnInit {
  connectionLogs: ConnectionLog[] = [];

  constructor(private logService: LogService) {}

  ngOnInit() {
    this.loadConnectionLogs();
  }

  loadConnectionLogs() {
    this.logService.getConnectionLogs().subscribe(
      (logs) => this.connectionLogs = logs,
      (error) => console.error(error)
    );
  }
}

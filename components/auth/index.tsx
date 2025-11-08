import DashboardComponent from './Dashboard';
import LoginComponent from './Login';

export { default as Dashboard } from './Dashboard';
export { default as Login } from './Login';

// Default export as an object of the actual components for convenience
const DefaultExport = { Login: LoginComponent, Dashboard: DashboardComponent };
export default DefaultExport;

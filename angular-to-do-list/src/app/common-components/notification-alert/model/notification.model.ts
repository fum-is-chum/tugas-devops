export interface Alert {
	type: string;
	message: string;
}

export interface ToastInfo {
  header?: string;
  body: string;
  delay?: number;
  show: boolean;
  iconClass?: string;
}
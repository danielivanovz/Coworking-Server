import { Order } from "../models/order.m";

export enum WorkspaceType {
	"desktop",
	"office",
	"meeting",
	"event",
}

export interface Reservation {
	start: string;
	end: string;
	order_id: Order["id"];
}

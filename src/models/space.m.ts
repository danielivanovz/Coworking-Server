import { Reservation, WorkspaceType } from "../types/Commons";

export interface Space {
	reservation: Reservation;
	type: WorkspaceType;
	area: string;
	max_seat: number;
	media: string;
}

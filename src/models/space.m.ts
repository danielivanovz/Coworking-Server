import { Reservation, WorkspaceType } from "../types/commons";

export interface Space {
	reservation: Reservation;
	type: WorkspaceType;
	area: string;
	max_seat: number;
	media: string;
}

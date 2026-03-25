export interface HistoryLog {
	admin: string;
	time: string;
	action: 'Approved' | 'Rejected';
	reason?: string;
}

export interface Club {
	id: string;
	avatar: string;
	name: string;
	foundedDate: string;
	description: string; // Nội dung HTML
	leader: string;
	isActive: boolean;
}
export type Status = 'Pending' | 'Approved' | 'Rejected';

export interface Log {
	admin: string;
	action: Status;
	date: string;
	note?: string;
}

export interface MemberRecord {
	id: string;
	name: string;
	email: string;
	phone: string;
	clubId: string;
	clubName: string;
	status: Status;
	history: Log[];
}

export interface RegistrationProps {
	clubs: any[];
	data: MemberRecord[];
	onSync: (newData: MemberRecord[]) => void;
}

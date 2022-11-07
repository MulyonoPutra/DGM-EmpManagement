export interface Data {
	messages: string;
	data: Employee[];
}

export interface EmployeeDTO {
	messages: string;
	data: Employee;
}

export interface Employee {
	_id?: string;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	birthDate: string;
	salary: number;
	status: string;
	group: string;
	description: string;
}

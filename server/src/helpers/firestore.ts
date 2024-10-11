export interface FirestoreEntity {
	id: string;
	createdAt: number;
	updatedAt?: number | null;
}

export interface FirestoreCreateDto {
	title: string;
}

export interface FirestoreUpdateDto {
	title?: string;
}

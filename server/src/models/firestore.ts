export interface Entity {
  id: string;
  createdAt: number;
  updatedAt: number | null;
}

export interface CreateDto {
  title: string;
}

export interface UpdateDto {
  title?: string;
}

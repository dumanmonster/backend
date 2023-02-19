export class BodyDto {
  entityData: [{ name: string }];

  entityType: 'lead' | 'contact' | 'companie';
}

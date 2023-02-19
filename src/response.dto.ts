export class ResponseDto {
  _links: {
    self: {
      href: string;
    };
  };
  _embedded: {
    leads: {
      id: number;
      request_id: string;
      _links: {
        self: {
          href: string;
        };
      };
    }[];
    companies: {
      id: number;
      request_id: string;
      _links: {
        self: {
          href: string;
        };
      };
    }[];
    contacts: {
      id: number;
      request_id: string;
      _links: {
        self: {
          href: string;
        };
      };
    }[];
  };
}

export class EntityResponseDto {
  id: number;
  request_id: string;
  _links: {
    self: {
      href: string;
    };
  };
}

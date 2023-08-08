import { TestBed } from '@angular/core/testing';

import { AddHeadingInterceptor } from './add-heading.interceptor';

describe('AddHeadingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddHeadingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddHeadingInterceptor = TestBed.inject(AddHeadingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

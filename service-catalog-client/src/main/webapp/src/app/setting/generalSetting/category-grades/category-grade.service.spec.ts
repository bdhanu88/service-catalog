import { TestBed, inject } from '@angular/core/testing';

import { CategoryGradeService } from './category-grade.service';

describe('CategoryGradeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryGradeService]
    });
  });

  it('should be created', inject([CategoryGradeService], (service: CategoryGradeService) => {
    expect(service).toBeTruthy();
  }));
});

import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Categories: {
    sortComparer: sortByCategory,
  },
  Users: {
    sortComparer: sortByName,
  },
};

export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export function sortByCategory(
  a: { category: string },
  b: { category: string }
): number {
  return a.category.localeCompare(b.category);
}

export function sortByTitle(
  a: { title: string },
  b: { title: string }
): number {
  return a.title.localeCompare(b.title);
}

const pluralNames = {
  Categories: 'Categories',
  Users: 'Users',
};

export const entityConfig = {
  entityMetadata,
  pluralNames,
};

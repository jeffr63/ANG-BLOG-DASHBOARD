import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Categories: {
    sortComparer: sortByCategory,
  },
  Posts: {
    sortComparer: sortByTitle,
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
  Posts: 'Posts',
  Users: 'Users',
};

export const entityConfig = {
  entityMetadata,
  pluralNames,
};

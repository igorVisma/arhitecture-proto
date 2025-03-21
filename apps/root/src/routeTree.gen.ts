/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LangIndexImport } from './routes/$lang/index'
import { Route as LangAboutImport } from './routes/$lang/about'

// Create/Update Routes

const LangIndexRoute = LangIndexImport.update({
  id: '/$lang/',
  path: '/$lang/',
  getParentRoute: () => rootRoute,
} as any)

const LangAboutRoute = LangAboutImport.update({
  id: '/$lang/about',
  path: '/$lang/about',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/$lang/about': {
      id: '/$lang/about'
      path: '/$lang/about'
      fullPath: '/$lang/about'
      preLoaderRoute: typeof LangAboutImport
      parentRoute: typeof rootRoute
    }
    '/$lang/': {
      id: '/$lang/'
      path: '/$lang'
      fullPath: '/$lang'
      preLoaderRoute: typeof LangIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/$lang/about': typeof LangAboutRoute
  '/$lang': typeof LangIndexRoute
}

export interface FileRoutesByTo {
  '/$lang/about': typeof LangAboutRoute
  '/$lang': typeof LangIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/$lang/about': typeof LangAboutRoute
  '/$lang/': typeof LangIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/$lang/about' | '/$lang'
  fileRoutesByTo: FileRoutesByTo
  to: '/$lang/about' | '/$lang'
  id: '__root__' | '/$lang/about' | '/$lang/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LangAboutRoute: typeof LangAboutRoute
  LangIndexRoute: typeof LangIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  LangAboutRoute: LangAboutRoute,
  LangIndexRoute: LangIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/$lang/about",
        "/$lang/"
      ]
    },
    "/$lang/about": {
      "filePath": "$lang/about.tsx"
    },
    "/$lang/": {
      "filePath": "$lang/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

import { DestinationName } from "../destinations/DestinationName";

/**
 * RudderStack Source Config API Response Type
 */
export interface RudderStack {
  isHosted: boolean;
  source: Source;
}

export interface Source {
  config: SourceConfig;
  id: string;
  name: string;
  writeKey: string;
  enabled: boolean;
  sourceDefinitionId: string;
  createdBy: string;
  workspaceId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  connections: Connection[];
  destinations: Destination[];
  sourceDefinition: SourceDefinition;
}

export interface SourceConfig {
  eventUpload: boolean;
  eventUploadTS: number;
}

export interface Connection {
  id: string;
  sourceId: string;
  destinationId: string;
  enabled: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Destination {
  config: any;
  secretConfig: any;
  id: string;
  name: string;
  enabled: boolean;
  workspaceId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  destinationDefinition: DestinationDefinition;
}

export interface DestinationDefinition {
  config: DestinationDefinitionConfig;
  configSchema: null;
  responseRules: null;
  id: string;
  name: DestinationName;
  displayName: string;
  category: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DestinationDefinitionConfig {
  destConfig: DestConfig;
  secretKeys: any[];
  excludeKeys: any[];
  includeKeys: string[];
  transformAt: string;
  transformAtV1: string;
  supportedSourceTypes: string[];
  saveDestinationResponse: boolean;
  supportedMessageTypes?: string[];
}

export interface DestConfig {
  web: string[];
  defaultConfig: string[];
}

export interface SourceDefinition {
  options: null;
  id: string;
  name: string;
  displayName: string;
  category: null;
  createdAt: Date;
  updatedAt: Date;
}

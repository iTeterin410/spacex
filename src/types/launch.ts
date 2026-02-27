export type LaunchLinks = {
  mission_patch?: string;
  mission_patch_small?: string;
};

export type Rocket = {
  rocket_name: string;
};

export type Launch = {
  mission_name: string;
  details?: string;
  links?: LaunchLinks;
  rocket?: Rocket;
};
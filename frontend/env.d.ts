declare namespace NodeJS {
  interface ProcessEnv {
    BACKEND_URL?: string
    NODE_ENV?: string
  }
}

declare const process: {
  env: NodeJS.ProcessEnv
}

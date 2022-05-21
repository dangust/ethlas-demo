import { filter, Subject } from 'rxjs'

export const alertService = {
  onAlert,
  success,
  error,
  info,
  warn,
  alert,
  clear,
}

export enum AlertTypesEnum {
  Success = 'Success',
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning',
}

export type AlertOptionsType = { keepAfterRouteChange: boolean }
export type AlertComponentType = {
  id?: string
  type: AlertTypesEnum
  message: string
  autoClose?: boolean
  fade?: boolean
  keepAfterRouteChange?: boolean
}

const alertSubject = new Subject()
const defaultId = 'default-alert'

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x: any) => x.id === id))
}

// convenience methods
function success(message: string, options?: AlertOptionsType) {
  alert({ ...options, type: AlertTypesEnum.Success, message })
}

function error(message: string, options?: AlertOptionsType) {
  alert({ ...options, type: AlertTypesEnum.Error, message })
}

function info(message: string, options?: AlertOptionsType) {
  alert({ ...options, type: AlertTypesEnum.Info, message })
}

function warn(message: string, options?: AlertOptionsType) {
  alert({ ...options, type: AlertTypesEnum.Warning, message })
}

// core alert method
function alert(alert: AlertComponentType) {
  alert.id = alert.id || defaultId
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose
  alertSubject.next(alert)
}

// clear alerts
function clear(id = defaultId) {
  alertSubject.next({ id })
}

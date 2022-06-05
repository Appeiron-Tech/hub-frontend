export function convertDayToNumber(day: string): number {
  switch (day.toUpperCase()) {
    case 'LUNES':
      return 1;
    case 'MARTES':
      return 2;
    case 'MIERCOLES':
      return 3;
    case 'JUEVES':
      return 4;
    case 'VIERNES':
      return 5;
    case 'SABADO':
      return 6;
    case 'DOMINGO':
      return 7;
    default:
      return 0;
  }
}

export function convertNumberToDay(day: number) {
  switch (day) {
    case 1:
      return 'LUNES';
    case 2:
      return 'MARTES';
    case 3:
      return 'MIERCOLES';
    case 4:
      return 'JUEVES';
    case 5:
      return 'VIERNES';
    case 6:
      return 'SABADO';
    case 7:
      return 'DOMINGO';
    default:
      return '';
  }

}
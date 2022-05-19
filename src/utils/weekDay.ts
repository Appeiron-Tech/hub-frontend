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
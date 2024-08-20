import { format } from 'date-fns';

export const formatMoney = (value: string): string => {
  
    const cleanedValue = value.replace(/\D/g, '');

    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
};

export const convertDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return format(date, 'MMMM d');
};

export const convertTimeStringToDate = (timeString: string): Date => {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  const currentDate = new Date();
  currentDate.setHours(hours, minutes, 0, 0);

  return currentDate;
}

export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
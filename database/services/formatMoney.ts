//Put comma in every 3 digits in the input box
export const formatMoney = (value: string): string => {
  
    const cleanedValue = value.replace(/\D/g, '');

    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formattedValue;
};

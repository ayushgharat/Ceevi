export function convertDate(dateString) {

  if(dateString === "Present") return dateString

    // Define the month abbreviations
    const monthAbbreviations = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    // Split the input string to extract year and month
    const [year, month] = dateString.split("-");
    
    // Convert month from "MM" to a number and get the corresponding abbreviation
    const monthIndex = parseInt(month, 10) - 1; // Convert month to zero-based index
    const monthAbbreviation = monthAbbreviations[monthIndex];
    
    // Return the formatted date string
    return `${monthAbbreviation} ${year}`;
  }
  
  
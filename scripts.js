// scripts.js

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const data = {
  response: {
    requestType: "FETCH_ATHLETE_DATA",
    requestBy: "ALL_MATCHING_ATHLETES",
    forDisplay: "BEST_RACES",

    data: {
      NM372: {
        firstName: "Nwabisa",
        surname: "Masiko",
        id: "NM372",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [9, 7, 8, 6],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [6, 7, 8, 7],
          },
        ],
      },

      SV782: {
        firstName: "Schalk",
        surname: "Venter",
        id: "SV782",
        races: [
          {
            date: '2022-11-18T20:00:00.000Z',
            time: [10, 8, 3, 12],
          },
          {
            date: '2022-11-25T20:00:00.000Z',
            time: [6, 8, 9, 11],
          },
          {
            date: '2022-12-02T20:00:00.000Z',
            time: [10, 11, 4, 8],
          },
          {
            date: '2022-12-09T20:00:00.000Z',
            time: [9, 8, 9, 11],
          },
        ],
      },
    },
  },
};

// Only edit below this comment

  // Function to create HTML elements for an athlete
const createHtml = (athleteData) => {
  // Extract athlete information from the data
  const { firstName, surname, id, races } = athleteData;

  // Find the latest race
  const latestRace = races[races.length - 1];

  // Extract date and time information from the latest race
  const raceDate = new Date(latestRace.date);
  const raceTime = latestRace.time;

  // Calculate total time for the latest race
  const totalMinutes = raceTime.reduce((acc, lapTime) => acc + lapTime, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Create HTML elements
  const fragment = document.createDocumentFragment();

  const title = document.createElement('h2');
  title.textContent = `Athlete: ${id}`;
  fragment.appendChild(title);

  const list = document.createElement('dl');

  // Create date string in the format 'd MMM YYYY'
  const formattedDate = `${raceDate.getDate()} ${MONTHS[raceDate.getMonth()]} ${raceDate.getFullYear()}`;

  list.innerHTML = `
    <dt>Full Name</dt>
    <dd>${firstName} ${surname}</dd>

    <dt>Total Races</dt>
    <dd>${races.length}</dd>

    <dt>Event Date (Latest)</dt>
    <dd>${formattedDate}</dd>

    <dt>Total Time (Latest)</dt>
    <dd>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}</dd>
  `;

  fragment.appendChild(list);

  return fragment; 
};

// Get the <section> elements by their data-athlete attributes and append athlete information
const nmSection = document.querySelector('[data-athlete="NM372"]');
const svSection = document.querySelector('[data-athlete="SV782"]');

// Append athlete information to the respective <section> elements
if (nmSection && svSection) {
  nmSection.appendChild(createHtml(data.response.data.NM372));
  svSection.appendChild(createHtml(data.response.data.SV782));
}
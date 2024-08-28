// Sample list of names
const names = [
    'Aasmund Verpe',
    'Ali Yasar Øzbal',
    'Andreas Ongstad',
    'Andreas Sanna Rukke',
    'Are Stifjell',
    'Elise Finsrud Kirkebøen',
    'Farman Safi',
    'Hans Magnus Torgheim',
    'Harald Ågedal',
    'Henrik Lund Nossen',
    'Håkon Kvamme',
    'Jon Arne Engan',
    'Lars Jørgen Rostad',
    'Lars-Petter Lundmark',
    'Lasse Hangaard',
    'Magnus Luciani Gabrielsen',
    'Marius Bjelde Andersen',
    'Markus Weberg',
    'Ole-Martin Trønnes',
    'Pawel Bieszke',
    'Ragnar Berglund',
    'Richard Hornnæs Hovde',
    'Sanne Cecilie Thorbjørnsen',
    'Sten-Isak Pilzer Brusevold',
    'Synne Graven-Sneltorp',
    'Thomas Mickelborg',
    'Thormod Nygård',
    'Tommy-André Olsen',
    'Ulrik Sæther Langvik',
    'Znar Zahraee'
];

// Function to display names with clickable list items
function displayNames() {
    const nameList = document.getElementById("nameList");
    names.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;

        // Add event listener to toggle selection when the text is clicked
        li.addEventListener('click', () => {
            li.classList.toggle('selected'); // Highlight the selected item
        });

        nameList.appendChild(li);
    });
}

// Function to get selected names
function getSelectedNames() {
    const selectedNames = [];
    const listItems = document.querySelectorAll("#nameList li");
    listItems.forEach((li) => {
        if (li.classList.contains("selected")) {
            selectedNames.push(li.textContent);
        }
    });
    return selectedNames;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Helper function to create groups of 3
function listsof3(list) {
    const lists = [];
    const iterations = Math.floor(list.length / 3);

    for (let i = 0; i < iterations; i++) {
        lists.push([list[i * 3], list[i * 3 + 1], list[i * 3 + 2]]);
    }

    return lists;
}

// Main function to group names
function namegroups(names) {
    shuffleArray(names); // Shuffle names randomly
    let groups = [];

    if (names.length < 6) {
        // Logic for when there are fewer than 6 names
        if (names.length === 4) {
            groups.push([names[0], names[1]]);
            groups.push([names[2], names[3]]);
        } else if (names.length === 5) {
            groups.push([names[0], names[1], names[2]]);
            groups.push([names[3], names[4]]);
        } else if (names.length === 6) {
            groups.push([names[0], names[1], names[2]]);
            groups.push([names[3], names[4], names[5]]);
        }
    } else {
        // Logic for when there are 6 or more names
        if (names.length % 3 === 1) {
            groups = listsof3(names);
            groups[groups.length - 1].push(names[names.length - 1]);  // Add the last leftover name to the last group
        } else if (names.length % 3 === 2) {
            groups = listsof3(names);
            groups[groups.length - 2].push(names[names.length - 2]);  // Add 2 leftover names
            groups[groups.length - 1].push(names[names.length - 1]);
        } else {
            groups = listsof3(names);
        }
    }
    return groups;
}

// Function to generate groups and display them
function generateGroups() {
    const selectedNames = getSelectedNames();
    const groupsContainer = document.getElementById("groupsContainer");
    groupsContainer.innerHTML = ""; // Clear previous groups

    // if (selectedNames.length < 4) {
    //     groupsContainer.innerHTML = "<p>Please select at least 4 names to generate groups.</p>";
    //     return;
    // }

    if (selectedNames.length < 4) {
        alert("Velg mer enn 3 navn");
        return;
    }

    const groups = namegroups(selectedNames);

    // Display the groups
    groups.forEach((group, index) => {
        const groupDiv = document.createElement("div");
        groupDiv.classList.add("group-item");
        groupDiv.innerHTML = `<strong>Gruppe ${index + 1}:</strong> ${group.join(", ")}`;
        groupsContainer.appendChild(groupDiv);
    });

    groupsContainer.scrollIntoView({ behavior: 'smooth'});
}

// Run the display function on page load
displayNames();

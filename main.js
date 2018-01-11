var game = {
	lastUpdate: new Date().getTime(),
	unlockedContent: {
		meadowants: false,
		gardenants: false,
	},
},
food = {
	name: "food",
	total: 0,
	perclick: 0.5,
},
seeds = {
	name: "seeds",
	total: 0,
	persecond: 0,
	foodvalue: 0.5,
},
fruit = {
	name: "fruit",
	total: 0,
	persecond: 0,
	foodvalue: 15,
},
honeydew = {
	name: "honeydew",
	total: 0,
	persecond: 0,
	foodvalue: 0,
},
insects = {
	name: "insects",
	total: 0,
	persecond: 0,
	foodvalue: 0,
},
honey = {
	name: "honey",
	total: 0,
	persecond: 0,
	foodvalue: 0,
},
animals = {
	name: "animals",
	total: 0,
	persecond: 0,
	foodvalue: 0,
},
fungi = {
	name: "fungi",
	total: 0,
	persecond: 0,
	foodvalue: 0,
},
nectar = {
	name: "nectar",
	total: 0,
	persecond: 0,
	foodvalue: 0,
};

var foragers = {
	name: "foragers",
	total: 0,
	timeSpentForaging: 0,
	maxInterval: 1,
},
meadowant = {
	name: "meadow ants",
	colonies: 0,
	queens: 0,
	workers: 0,
	production: 0.2,
	queenboost: 0.4,
	colonyboost: 0.8,
},
gardenant = {
	name: "garden ants",
	colonies: 0,
	queens: 0,
	workers: 0,
	production: 1,
	queenboost: 0.5,
	colonyboost: 2.5,
},
harvesterant = {
	name: "harvester ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
carpenterant = {
	name: "carpenter ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
weaverant = {
	name: "weaver ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
redstingingant = {
	name: "red stinging ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
honeypotant = {
	name: "honey pot ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
fireant = {
	name: "fire ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
leafcutterant = {
	name: "leaf cutter ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
trapjawant = {
	name: "trap jaw ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
argentineant = {
	name: "argentine ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
armyant = {
	name: "army ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
bulletant = {
	name: "bullet ants",
	colonies: 0,
	queens: 0,
	workers: 0,
},
upgrades = {
	food: 0,
	forager: 0,
	forageForAnts: 0,
	addToFood: 0,
	buyToQueen: 0,
	meadowWorker: 0,
	meadowQueen: 0,
	meadowColony: 0,
	costs: {
		food: [150],
		forager: [500],
		forageForAnts: [50000],
		addToFood: [1000],
		buyToQueen: [500, 5000],
		meadowWorker: [30, 100, 500, 2500],
		meadowQueen: [1000, 2500, 7500],
		meadowColony: [75000, 250000],
	},
	ownedToUnlock: {
		meadowAnts: [5, 10, 20, 40],
	}
},
saveVar = {
	game: game,
	food: food,
	seeds: seeds,
	fruit: fruit,
	honeydew: honeydew,
	insects: insects,
	honey: honey,
	animals: animals,
	fungi: fungi,
	nectar: nectar,
	foragers: foragers,
	meadowant: meadowant,
	gardenant: gardenant,
	harvesterant: harvesterant,
	carpenterant: carpenterant,
	weaverant: weaverant,
	redstingingant: redstingingant,
	honeypotant: honeypotant,
	fireant: fireant,
	leafcutterant: leafcutterant,
	trapjawant: trapjawant,
	argentineant: argentineant,
	armyant: armyant,
	bulletant: bulletant,
	upgrades: upgrades,
};
// this reroutes console.log() to appear in the game log
(function () {
    var old = console.log;
    var logger = document.getElementById('logtext');
    console.log = function (message) {
	    var logtext = document.getElementById('logbody').innerHTML;
        if (typeof message == 'object') {
            logger.innerHTML = (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<hr />' + logtext;
        } else {
            logger.innerHTML = message + '<hr />' + logtext;
        }
    }
})();

document.getElementById('body').onload = function() {
	var compressed = localStorage.getItem("antsave");
	var decompressed = LZString.decompressFromBase64(compressed);
	if (decompressed === "") {
		console.log("- Welcome! To begin, click the grass to forage for food.\n");
		return;
	}
	var save = JSON.parse(decompressed);
	loadVariables(save);
	updateCosts('all costs');
	checkForUnlockedContent('all content');
};

function forageForFood(number) {
	if (number === 0) {
		food.total += food.perclick;
	} else {
		food.total += (food.perclick * number);
	}
}
function buyForager() {
	var cost = Math.floor(10 * Math.pow(3.2, foragers.total));
	if (food.total >= cost) {
		food.total -= cost;
		foragers.total += 1;
		document.getElementById('foragers').innerHTML = foragers.total;
		updateCosts('foragers');
	}
	if (game.unlockedContent.meadowants === false) checkForUnlockedContent('meadow ants');
}
function addToFood(foodType) {
	if (foodType === 'seeds') {
		food.total += (seeds.total * seeds.foodvalue);
		seeds.total -= seeds.total;
	}
}
function buyMeadowAnt(ant) {
	if (ant === 'worker') {
		var cost = Math.floor(10 * Math.pow(1.1, meadowant.workers));
		if (food.total >= cost) {
			food.total -= cost;
			meadowant.workers += 1;
			document.getElementById('meadowWorkers').innerHTML = decimals(meadowant.workers);
			updateCosts('meadow workers');
			checkForUnlockedContent('meadow worker upgrades');
		}
	}
	if (ant === 'queen') {
		var cost = Math.floor(20 * Math.pow(1.1, meadowant.queens));
		if (meadowant.workers >= cost) {
			meadowant.workers -= cost;
			meadowant.queens += 1;
			document.getElementById('meadowQueens').innerHTML = decimals(meadowant.queens);
			document.getElementById('meadowWorkers').innerHTML = decimals(meadowant.workers);
			updateCosts('meadow queens');
			checkForUnlockedContent('meadow queen upgrades');
		}
	}
}

function buyUpgrade(upgrade) {
	var cost = upgrades.costs.meadowWorker[upgrades.meadowWorker];
	if ((food.total >= cost)) {
		food.total -= cost;
		upgrades.meadowWorker += 1;
		meadowant.production *= 1.6;
		document.getElementById("meadowWorkerUpgrades").classList.add("hidden");
		console.log("- Meadow worker production has increased by 60%!")
	}
	updateCosts('all costs');
}

function loadVariables(loadVar) { 
	// load the saved variables
	if (typeof loadVar.game.lastUpdate !== null) game.lastUpdate = loadVar.game.lastUpdate;
	if (typeof loadVar.game.unlockedContent !== null) game.unlockedContent = loadVar.game.unlockedContent;

	if (typeof loadVar.food.name !== null) food.name = loadVar.food.name;
	if (typeof loadVar.food.total !== null) food.total = loadVar.food.total;
	if (typeof loadVar.food.perclick !== null) food.perclick = loadVar.food.perclick;
	if (typeof loadVar.seeds.name !== null) seeds.name = loadVar.seeds.name;
	if (typeof loadVar.seeds.total !== null) seeds.total = loadVar.seeds.total;
	if (typeof loadVar.seeds.persecond !== null) seeds.persecond = loadVar.seeds.persecond;
	if (typeof loadVar.seeds.foodvalue !== null) seeds.foodvalue = loadVar.seeds.foodvalue;
	if (typeof loadVar.fruit.name !== null) fruit.name = loadVar.fruit.name;
	if (typeof loadVar.fruit.total !== null) fruit.total = loadVar.fruit.total;
	if (typeof loadVar.fruit.persecond !== null) fruit.persecond = loadVar.fruit.persecond;
	if (typeof loadVar.fruit.foodvalue !== null) fruit.foodvalue = loadVar.fruit.foodvalue;
	if (typeof loadVar.honeydew.name !== null) honeydew.name = loadVar.honeydew.name;
	if (typeof loadVar.honeydew.total !== null) honeydew.total = loadVar.honeydew.total;
	if (typeof loadVar.honeydew.persecond !== null) honeydew.persecond = loadVar.honeydew.persecond;
	if (typeof loadVar.honeydew.foodvalue !== null) honeydew.foodvalue = loadVar.honeydew.foodvalue;
	if (typeof loadVar.insects.name !== null) insects.name = loadVar.insects.name;
	if (typeof loadVar.insects.total !== null) insects.total = loadVar.insects.total;
	if (typeof loadVar.insects.persecond !== null) insects.persecond = loadVar.insects.persecond;
	if (typeof loadVar.insects.foodvalue !== null) insects.foodvalue = loadVar.insects.foodvalue;
	if (typeof loadVar.honey.name !== null) honey.name = loadVar.honey.name;
	if (typeof loadVar.honey.total !== null) honey.total = loadVar.honey.total;
	if (typeof loadVar.honey.persecond !== null) honey.persecond = loadVar.honey.persecond;
	if (typeof loadVar.honey.foodvalue !== null) honey.foodvalue = loadVar.honey.foodvalue;
	if (typeof loadVar.animals.name !== null) animals.name = loadVar.animals.name;
	if (typeof loadVar.animals.total !== null) animals.total = loadVar.animals.total;
	if (typeof loadVar.animals.persecond !== null) animals.persecond = loadVar.animals.persecond;
	if (typeof loadVar.animals.foodvalue !== null) animals.foodvalue = loadVar.animals.foodvalue;
	if (typeof loadVar.fungi.name !== null) fungi.name = loadVar.fungi.name;
	if (typeof loadVar.fungi.total !== null) fungi.total = loadVar.fungi.total;
	if (typeof loadVar.fungi.persecond !== null) fungi.persecond = loadVar.fungi.persecond;
	if (typeof loadVar.fungi.foodvalue !== null) fungi.foodvalue = loadVar.fungi.foodvalue;
	if (typeof loadVar.nectar.name !== null) nectar.name = loadVar.nectar.name;
	if (typeof loadVar.nectar.total !== null) nectar.total = loadVar.nectar.total;
	if (typeof loadVar.nectar.persecond !== null) nectar.persecond = loadVar.nectar.persecond;
	if (typeof loadVar.nectar.foodvalue !== null) nectar.foodvalue = loadVar.nectar.foodvalue;

	if (typeof loadVar.foragers.name !== null) foragers.name = loadVar.foragers.name;
	if (typeof loadVar.foragers.total !== null) foragers.total = loadVar.foragers.total;
	if (typeof loadVar.foragers.maxInterval !== null) foragers.maxInterval = loadVar.foragers.maxInterval;
	if (typeof loadVar.meadowant.name !== null) meadowant.name = loadVar.meadowant.name;
	if (typeof loadVar.meadowant.colonies !== null) meadowant.colonies = loadVar.meadowant.colonies;
	if (typeof loadVar.meadowant.queens !== null) meadowant.queens = loadVar.meadowant.queens;
	if (typeof loadVar.meadowant.workers !== null) meadowant.workers = loadVar.meadowant.workers;
	if (typeof loadVar.meadowant.production !== null) meadowant.production = loadVar.meadowant.production;
	if (typeof loadVar.meadowant.queenboost !== null) meadowant.queenboost = loadVar.meadowant.queenboost;
	if (typeof loadVar.meadowant.colonyboost !== null) meadowant.colonyboost = loadVar.meadowant.colonyboost;
	if (typeof loadVar.gardenant.name !== null) gardenant.name = loadVar.gardenant.name;
	if (typeof loadVar.gardenant.colonies !== null) gardenant.colonies = loadVar.gardenant.colonies;
	if (typeof loadVar.gardenant.queens !== null) gardenant.queens = loadVar.gardenant.queens;
	if (typeof loadVar.gardenant.workers !== null) gardenant.workers = loadVar.gardenant.workers;
	if (typeof loadVar.gardenant.production !== null) gardenant.production = loadVar.gardenant.production;
	if (typeof loadVar.gardenant.queenboost !== null) gardenant.queenboost = loadVar.gardenant.queenboost;
	if (typeof loadVar.gardenant.colonyboost !== null) gardenant.colonyboost = loadVar.gardenant.colonyboost;
	if (typeof loadVar.carpenterant.name !== null) carpenterant.name = loadVar.carpenterant.name;
	if (typeof loadVar.carpenterant.colonies !== null) carpenterant.colonies = loadVar.carpenterant.colonies;
	if (typeof loadVar.carpenterant.queens !== null) carpenterant.queens = loadVar.carpenterant.queens;
	if (typeof loadVar.carpenterant.workers !== null) carpenterant.workers = loadVar.carpenterant.workers;
	if (typeof loadVar.weaverant.name !== null) weaverant.name = loadVar.weaverant.name;
	if (typeof loadVar.weaverant.colonies !== null) weaverant.colonies = loadVar.weaverant.colonies;
	if (typeof loadVar.weaverant.queens !== null) weaverant.queens = loadVar.weaverant.queens;
	if (typeof loadVar.weaverant.workers !== null) weaverant.workers = loadVar.weaverant.workers;
	if (typeof loadVar.redstingingant.name !== null) redstingingant.name = loadVar.redstingingant.name;
	if (typeof loadVar.redstingingant.colonies !== null) redstingingant.colonies = loadVar.redstingingant.colonies;
	if (typeof loadVar.redstingingant.queens !== null) redstingingant.queens = loadVar.redstingingant.queens;
	if (typeof loadVar.redstingingant.workers !== null) redstingingant.workers = loadVar.redstingingant.workers;
	if (typeof loadVar.honeypotant.name !== null) honeypotant.name = loadVar.honeypotant.name;
	if (typeof loadVar.honeypotant.colonies !== null) honeypotant.colonies = loadVar.honeypotant.colonies;
	if (typeof loadVar.honeypotant.queens !== null) honeypotant.queens = loadVar.honeypotant.queens;
	if (typeof loadVar.honeypotant.workers !== null) honeypotant.workers = loadVar.honeypotant.workers;
	if (typeof loadVar.fireant.name !== null) fireant.name = loadVar.fireant.name;
	if (typeof loadVar.fireant.colonies !== null) fireant.colonies = loadVar.fireant.colonies;
	if (typeof loadVar.fireant.queens !== null) fireant.queens = loadVar.fireant.queens;
	if (typeof loadVar.fireant.workers !== null) fireant.workers = loadVar.fireant.workers;
	if (typeof loadVar.leafcutterant.name !== null) leafcutterant.name = loadVar.leafcutterant.name;
	if (typeof loadVar.leafcutterant.colonies !== null) leafcutterant.colonies = loadVar.leafcutterant.colonies;
	if (typeof loadVar.leafcutterant.queens !== null) leafcutterant.queens = loadVar.leafcutterant.queens;
	if (typeof loadVar.leafcutterant.workers !== null) leafcutterant.workers = loadVar.leafcutterant.workers;
	if (typeof loadVar.trapjawant.name !== null) trapjawant.name = loadVar.trapjawant.name;
	if (typeof loadVar.trapjawant.colonies !== null) trapjawant.colonies = loadVar.trapjawant.colonies;
	if (typeof loadVar.trapjawant.queens !== null) trapjawant.queens = loadVar.trapjawant.queens;
	if (typeof loadVar.trapjawant.workers !== null) trapjawant.workers = loadVar.trapjawant.workers;
	if (typeof loadVar.argentineant.name !== null) argentineant.name = loadVar.argentineant.name;
	if (typeof loadVar.argentineant.colonies !== null) argentineant.colonies = loadVar.argentineant.colonies;
	if (typeof loadVar.argentineant.queens !== null) argentineant.queens = loadVar.argentineant.queens;
	if (typeof loadVar.argentineant.workers !== null) argentineant.workers = loadVar.argentineant.workers;
	if (typeof loadVar.armyant.name !== null) armyant.name = loadVar.armyant.name;
	if (typeof loadVar.armyant.colonies !== null) armyant.colonies = loadVar.armyant.colonies;
	if (typeof loadVar.armyant.queens !== null) armyant.queens = loadVar.armyant.queens;
	if (typeof loadVar.armyant.workers !== null) armyant.workers = loadVar.armyant.workers;
	if (typeof loadVar.bulletant.name !== null) bulletant.name = loadVar.bulletant.name;
	if (typeof loadVar.bulletant.colonies !== null) bulletant.colonies = loadVar.bulletant.colonies;
	if (typeof loadVar.bulletant.queens !== null) bulletant.queens = loadVar.bulletant.queens;
	if (typeof loadVar.bulletant.workers !== null) bulletant.workers = loadVar.bulletant.workers;

	if (typeof loadVar.upgrades.food !== null) upgrades.food = loadVar.upgrades.food;
	if (typeof loadVar.upgrades.addToFood !== null) upgrades.addToFood = loadVar.upgrades.addToFood;
	if (typeof loadVar.upgrades.forager !== null) upgrades.forager = loadVar.upgrades.forager;
	if (typeof loadVar.upgrades.meadowWorker !== null) upgrades.meadowWorker = loadVar.upgrades.meadowWorker;
	if (typeof loadVar.upgrades.meadowQueen !== null) upgrades.meadowQueen = loadVar.upgrades.meadowQueen;
	if (typeof loadVar.upgrades.forageForAnts !== null) upgrades.forageForAnts = loadVar.upgrades.forageForAnts;
	if (typeof loadVar.upgrades.buyToQueen !== null) upgrades.buyToQueen = loadVar.upgrades.buyToQueen;

	document.getElementById("food").innerHTML = decimals(food.total);
	document.getElementById("seeds").innerHTML = decimals(seeds.total);
	document.getElementById("seedsPerSecond").innerHTML = decimals(seeds.persecond);
	document.getElementById("fruit").innerHTML = decimals(fruit.total);
	document.getElementById("fruitPerSecond").innerHTML = decimals(fruit.persecond);
	document.getElementById("honeydew").innerHTML = decimals(honeydew.total);
	document.getElementById("honeydewPerSecond").innerHTML = decimals(honeydew.persecond);
	document.getElementById("insects").innerHTML = decimals(insects.total);
	document.getElementById("insectsPerSecond").innerHTML = decimals(insects.persecond);
	document.getElementById("honey").innerHTML = decimals(honey.total);
	document.getElementById("honeyPerSecond").innerHTML = decimals(honey.persecond);
	document.getElementById("animals").innerHTML = decimals(animals.total);
	document.getElementById("animalsPerSecond").innerHTML = decimals(animals.persecond);
	document.getElementById("fungi").innerHTML = decimals(fungi.total);
	document.getElementById("fungiPerSecond").innerHTML = decimals(fungi.persecond);
	document.getElementById("nectar").innerHTML = decimals(nectar.total);
	document.getElementById("nectarPerSecond").innerHTML = decimals(nectar.persecond);
	
	document.getElementById("foragers").innerHTML = foragers.total;
	document.getElementById("meadowColonies").innerHTML = meadowant.colonies;
	document.getElementById("meadowQueens").innerHTML = meadowant.queens;
	document.getElementById("meadowWorkers").innerHTML = meadowant.workers;
	document.getElementById("gardenColonies").innerHTML = gardenant.colonies;
	document.getElementById("gardenQueens").innerHTML = gardenant.queens;
	document.getElementById("gardenWorkers").innerHTML = gardenant.workers;
	document.getElementById("harvesterColonies").innerHTML = harvesterant.colonies;
	document.getElementById("carpenterColonies").innerHTML = carpenterant.colonies;
	document.getElementById("weaverColonies").innerHTML = weaverant.colonies;
	document.getElementById("redStingingColonies").innerHTML = redstingingant.colonies;
	document.getElementById("honeyPotColonies").innerHTML = honeypotant.colonies;
	document.getElementById("fireColonies").innerHTML = fireant.colonies;
	document.getElementById("leafCutterColonies").innerHTML = leafcutterant.colonies;
	document.getElementById("trapJawColonies").innerHTML = trapjawant.colonies;
	document.getElementById("argentineColonies").innerHTML = argentineant.colonies;
	document.getElementById("armyColonies").innerHTML = armyant.colonies;
	document.getElementById("bulletColonies").innerHTML = bulletant.colonies;
}

function saveGame(saveType) {
	var string = JSON.stringify(saveVar);
	compressed = LZString.compressToBase64(string);
	localStorage.setItem("antsave", compressed);
	if (saveType === 'Save') console.log("- Game successfully saved.");
	if (saveType === 'AutoSave') console.log('- Auto-save complete.')
}
function deleteGame() {
	if (confirm("Deleting your save file is permanent and cannot be reversed! Press ok to continue.") === true) {
		localStorage.removeItem("antsave");
		location.reload();
	}
}
function importGame() {
	compressed = document.getElementById("impexpbox").value;
	decompressed = LZString.decompressFromBase64(compressed);
	var save = JSON.parse(decompressed);
	loadVariables(save);
	var string = JSON.stringify(saveVar);
	compressed = LZString.compressToBase64(string);
	localStorage.setItem("antsave", compressed);
	document.getElementById("impexpbox").value = "";
	console.log("- New data was imported and saved.");
	showFood();
}
function exportGame() {
	var string = JSON.stringify(saveVar);
	compressed = LZString.compressToBase64(string);
	localStorage.setItem("antsave", compressed);
	compressed = localStorage.getItem("antsave");
	document.getElementById("impexpbox").value = compressed;
	document.getElementById("impexpbox").select();
	console.log("- Save successfully exported.");
}

setInterval(function() { // save the game every minute if it isn't paused
	if (document.getElementById('gameStatus').innerHTML !== 'Resume') saveGame('AutoSave');
}, 60000);
var tickspeed = 350
setInterval(function() { // run through the timer if the game isn't paused
	if (document.getElementById('gameStatus').innerHTML !== 'Resume') {
		var thisUpdate = new Date().getTime();
		var delta = thisUpdate - game.lastUpdate;
		delta /= 1000 // convert the time that passed to seconds
		// save the most recent time
		game.lastUpdate = new Date().getTime();
		calculateAndDisplayAmounts(delta);
	}
}, tickspeed);

function calculateAndDisplayAmounts(secondsPassed) {
	if (secondsPassed >= 60) { // if the player was gone for at least a minute, display a welcome back message
		console.log(decimals(secondsPassed / 60)+" minutes have passed since your last visit.")
		var foodDifference = (foragers.total * food.perclick) * (secondsPassed / foragers.maxInterval);
		var seedDifference = secondsPassed * seeds.persecond;
		console.log("- Welcome back! While you were away,<br />your foragers found:<br />- "
			+decimals(foodDifference)+" food<br />your ants found:<br />- " + decimals(seedDifference) + " seeds");
	}
	// calculate amounts
	forageInterval(secondsPassed);
	seeds.persecond = (meadowant.workers * (meadowant.production + ((meadowant.queenboost * (1 + (meadowant.colonies * meadowant.colonyboost))) * meadowant.queens)));
	seeds.total += seeds.persecond * secondsPassed
	// display amounts
	document.getElementById('food').innerHTML = decimals(food.total);
	document.getElementById('seeds').innerHTML = decimals(seeds.total);
	document.getElementById('seedsPerSecond').innerHTML = decimals(seeds.persecond);
}
function toggleGameTimer() {
	if (document.getElementById('gameStatus').innerHTML === 'Pause') {
		document.getElementById('gameStatus').innerHTML = 'Resume';
		console.log('- Ant Conquest has been paused.');
	} else {
		document.getElementById('gameStatus').innerHTML = 'Pause';
		console.log('- Ant Conquest has been resumed.');
	}
}

function checkForUnlockedContent(contentType) {
	if ((contentType === 'meadow ants') || (contentType === 'all content')) {
		if ((contentType === 'meadow ants') && (foragers.total === 1)) {
			document.getElementById('viewMeadowAnts').classList.remove('hidden');
			document.getElementById('seedinfo').classList.remove('hidden');
			document.getElementById('seedsToFood').classList.remove('hidden');
			game.unlockedContent.meadowants = true;
			return;
		} else if (game.unlockedContent.meadowants === true) {
			document.getElementById('viewMeadowAnts').classList.remove('hidden');
			document.getElementById('seedinfo').classList.remove('hidden');
			document.getElementById('seedsToFood').classList.remove('hidden');
		}
	}
	if ((contentType === 'meadow worker upgrades') || contentType === 'all content') {
		if (meadowant.workers >= upgrades.ownedToUnlock.meadowAnts[upgrades.meadowWorker]) {
			document.getElementById("meadowWorkerUpgrades").classList.remove("hidden");
			$("#meadowWorkerUpgrades").attr("data-original-title", "Cost: "+upgrades.costs.meadowWorker[upgrades.meadowWorker]+"\nIncreases meadow worker production by 60%.");
		}
	}
	if ((contentType === 'meadow queen upgrades') || contentType === 'all content') {
		if (meadowant.queens >= upgrades.ownedToUnlock.meadowAnts[upgrades.meadowQueen]) {
			document.getElementById("meadowQueenUpgrades").classList.remove("hidden");
			$("#meadowQueenUpgrades").attr("data-original-title", "Cost: "+upgrades.costs.meadowQueen[upgrades.meadowQueen]+"\nIncreases meadow queen boost by 90%.");
		}
	}
	if ((contentType === 'to queen upgrades') || contentType === 'all content') {
		if (meadowant.queens >= 1) {
			document.getElementById("buyToQueenUpgrades").classList.remove("hidden");
			$("#buyToQueenUpgrades").attr("data-original-title", "Cost: "+upgrades.costs.buyToQueen[upgrades.buyToQueen]+"\nBuying queens has never been easier.");
		}
	}
}

function forageInterval(number) {
	if (foragers.total === 0) return;
	foragers.timeSpentForaging += number;
	if (foragers.timeSpentForaging >= foragers.maxInterval) {
		do {
			forageForFood(foragers.total);
			foragers.timeSpentForaging -= foragers.maxInterval;
		}
		while (foragers.timeSpentForaging >= foragers.maxInterval);
	}
}

function updateCosts(toUpdate) {
	if (toUpdate === 'all costs') {
		$("#foragerButton").tooltip({
			container: 'body',
			placement: 'bottom',
			boundary: 'window',
			trigger: 'hover',
		});
		$(".colonyButton").tooltip({
			container: 'body',
			placement: 'left',
			boundary: 'window',
			trigger: 'hover',
		});
		$(".antButton").tooltip({
			container: 'body',
			placement: 'left',
			boundary: 'window',
			trigger: 'hover',
		});
		$(".upgradeButton").tooltip({
			container: 'body',
			placement: 'top',
			boundary: 'window',
			trigger: 'hover',
		});
	}
	if (toUpdate == 'foragers' || toUpdate === 'all costs') {
		var cost = Math.floor(10 * Math.pow(3.2, foragers.total));
		document.getElementById('foragerCost').innerHTML = cost;
		if (toUpdate !== 'all costs') $("#foragerButton").attr("data-original-title", "Foraging "+decimals(foragers.total / foragers.maxInterval)+" times every second").tooltip('show');
		else $("#foragerButton").attr("data-original-title", "Foraging "+decimals(foragers.total / foragers.maxInterval)+" times every second").tooltip();
	}
	if (toUpdate == 'meadow workers' || toUpdate === 'all costs') {
		var cost = Math.floor(10 * Math.pow(1.1, meadowant.workers));
		document.getElementById('meadowWorkerCost').innerHTML = decimals(cost);
		if (toUpdate !== 'all costs') $("#meadowWorker").attr("data-original-title", "Finds "+decimals(meadowant.production)+" seeds every second\n("+decimals(meadowant.production * meadowant.workers)+" total)").tooltip('show');
		else $("#meadowWorker").attr("data-original-title", "Finds "+decimals(meadowant.production)+" seeds every second\n("+decimals(meadowant.production * meadowant.workers)+" total)").tooltip();
	}
	if (toUpdate == 'meadow queens' || toUpdate === 'all costs') {
		var cost = Math.floor(20 * Math.pow(1.1, meadowant.queens));
		document.getElementById('meadowWorkerCost').innerHTML = decimals(cost);
		if (toUpdate !== 'all costs') $("#meadowQueen").attr("data-original-title", "Boosts worker findings by "+decimals(meadowant.queenboost)+" each\n("+decimals(meadowant.queenboost * meadowant.queens)+" total)").tooltip('show');
		else $("#meadowQueen").attr("data-original-title", "Boosts worker findings by "+decimals(meadowant.queenboost)+" each\n("+decimals(meadowant.queenboost * meadowant.queens)+" total)").tooltip();
	}
}

function decimals(input) {
	// clean up the numbers being displayed on-screen
	var output = Math.round(input * 100) / 100;
	return output
}

function displayAnts(antType) {
	if (antType === 'meadow') {
		if (document.getElementById("meadowDisplay").innerHTML == "Display Colony Information") {
			document.getElementById("meadowAntContainer").classList.remove("hidden");
			document.getElementById("meadowDisplay").innerHTML = "Hide Colony Information";
		} else {
			document.getElementById("meadowAntContainer").classList.add("hidden");
			document.getElementById("meadowDisplay").innerHTML = "Display Colony Information";
		}
	}
}
function showFood() {
	hideMainContent();
	document.getElementById('foodContent').classList.remove('hidden');
}
function showSettings() {
	hideMainContent();
	document.getElementById('settingsContent').classList.remove('hidden');
}
function hideMainContent() {
	document.getElementById('foodContent').classList.add('hidden');
	document.getElementById('settingsContent').classList.add('hidden');
}
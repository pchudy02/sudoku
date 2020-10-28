"use strict";
var board = document.querySelector("#board");
var size; // ilość wiekrszy i kolumn
var count_x = 3, count_y = 3; // ilość sektorów w pionie i poziomie
var number; // liczba losowana (bufor dla wypełniania)
var table = []; // tablica 1D
var id_length = 1; // odnalezienie odpowiedniej długości adresacji


function count()
{
	count_x = document.querySelector("#count_x").value;
	count_y = document.querySelector("#count_y").value;
	size = count_x*count_y;
	// if(size === undefined)
	// {

	// }
	// count_x = Math.round(size ** (1/2));
	// count_y = Math.round(size ** (1/2));

	// for(let z = 0; count_y*count_x != size;)
	// {
	// 	if(z == 0)
	// 	{
	// 		count_y++;
	// 		z = 1;
	// 	}
	// 	else
	// 	{
	// 		count_x--;
	// 		z = 0;
	// 	}
	// }
}

function chk_ver(y, y1, z1)
{
	for(let z = 0; z < size; z++)
	{
		if(table[z][y*count_x + y1] == z1)
		{
			return false;
		}
	}
	return true;
}

function chk_hor(x, x1, z1)
{
	for(let z = 0; z < size; z++)
	{
		if(table[x*count_y + x1][z] == z1)
		{
			return false;
		}
	}
	return true;
}

function chk_sqr(x, y, z1)
{
	for(let x1 = 0; x1 < count_y; x1++)
	{
		for(let y1 = 0; y1 < count_x; y1++)
		{
			if(table[x*count_y + x1][y*count_x + y1] == z1)
			{
				return false;
			}
		}
	}
	return true;
}

function fill(x, x1, z)
{
	let tab = Array(size+1);;
	tab.fill(0);
	tab[0] = Array(size);
	tab[0].fill(0);

	// Generowanie tablic uniwersalności, dla liczb i kolumn i wypełnianie komórek z tylko jedną możliwą wartością
	/// Generowanie tablic uniwersalności, dla liczb i kolumn
	for(let y = 0; y < count_y; y++) 
	{
		for(let y1 = 0; y1 < count_x; y1++)
		{
			if(table[x*count_y + x1][y*count_x + y1] === undefined)
			{
				for(let z1 = 1; z1 <= size; z1++)
				{
					if(chk_sqr(x, y, z1) && chk_ver(y, y1, z1) && chk_hor(x, x1, z1))
					{
						tab[z1]++;
						tab[0][y * count_x + y1]++;
					}
				}
			}

			///	Wypełnianie komórek z tylko jedną możliwą wartością
			if(tab[0][y * count_x + y1] == 1)
			{
				let z1 = 1;
				
				while(!(chk_sqr(x, y, z1) && chk_ver(y, y1, z1) && chk_hor(x, x1, z1)))
				{
					z1++;
				}

				table[x*count_y + x1][y*count_x + y1] = z1;
				z++;
				y = 0;
				y1 = -1;
				tab.fill(0);
				tab[0] = Array(size);
				tab[0].fill(0);
			}
		}
	}

	// Ile razy wystąpi najrzadsza wartość
	let min = size;

	for(let z1 = 1; z1 <= size; z1++)
	{
		if(tab[z1] < min && tab[z1] != 0)
		{
			min = tab[z1];
		}
	}

	// Ile wartości można wpisać do najbardziej uniwersalnej komórki
	let max = 0;

	for(let y = 0; y < count_y; y++)
	{
		for(let y1 = 0; y1 < count_x; y1++)
		{
			if(tab[0][y * count_x + y1] > max)
			{
				max = tab[0][y * count_x + y1];
			}
		}
	}

	let y = Math.round(Math.random()*(count_y-1));
	let y1 = Math.round(Math.random()*(count_x-1));
	let z1 = Math.round(Math.random()*(size-1) + 1);
	// Szukanie peirwszej najrzadszej wartości
	while(true)
	// z1 - obecnie sprawdzana wartość
	{
		// Sprawdzanie czy obecna wartość należy do najrzadszych
		if(min == tab[z1])
		{
			let z2 = 0; // ilość komórek z maksymalną wartością wartości gdzie nie pasuje "z1"
			let z2_mc = 0; // ilość komórek z maksymalną wartością wartości
			let z2_e = 0; // ilość sprawdonych komórek
			// Sprawdzanie wierszy i kolumn dla 
			while(true)
			{
				z2_e++;
				// Szukanie najbardziej uniwersalnej komórki
				if(max == tab[0][y * count_x + y1])
				{
					z2_mc++;
					
					// Sprawdzanie czy dana wartość
					if(chk_ver(y, y1, z1) && chk_sqr(x, y, z1))
					{
						break;
					}
					else
					{
						z2++;
						y1++;

						if(y1 == count_x)
						{
							y1 = 0;
							y++;

							if(y == count_y)
							{
								y = 0;
							}
						}	
					}
				}
				else
				{
					y1++;

					if(y1 == count_x)
					{
						y1 = 0;
						y++;

						if(y == count_y)
						{
							y = 0;
						}
					}
				}

				if(z2_e == size && z2 == z2_mc)
				{
					max--;
					z2_e = 0;
				}
			}

			table[x*count_y + x1][y*count_x + y1] = z1;

			// Po znalezieniu komórki dla wartości, kończy pętlę
			break;
		}
		else
		{
			if(z1 == size)
			{
				z1 = 1;
			}
			else
			{
				z1++;
			}
		}

		if(max == 0 && min == size)
		{
			break;
		}
	}
	return z;
}

function chk_afr()
{
	
	// let x = Math.floor(Math.floor(parseFloat(this.id.substr(1)) / 10**size) / count_y);
	// let x1 = Math.floor(parseFloat(this.id.substr(1)) / 10**size) % count_x;
	// let y = Math.floor(10**size * (parseFloat(this.id.substr(1) / 10**size - x) / count_x));
	// let y1 = 10**size * (parseFloat(this.id.substr(1) / 10**size - x) % count_y);
	for(let x = 0; x < count_x; x++)
	{
		for(let y = 0; y < count_y; y++)
		{
			for(let z = 1; z <= size; z++)
			{
				if(chk_hor(x, y, z) || chk_ver(y, x, z) || chk_sqr(x, y, z))
				{
					return false;
				}
			}
		}
	}
	return true;
}

function score_f()
{
	let score = document.querySelector("#score");
	if(chk_afr())
	{
		score.innerHTML = "Gratulację, sudoku jest rozwiązane";
	}
	else
	{
		score.innerHTML = "Niestety obecne rozwiązanie zawiera błędy";
	}
}

function gener()
{
	document.querySelector("#board").remove()
	count();
	
	for (let z = size - 1; z >= 10; size++) 
	{
		z = z / 10;
	}

	for (let x = 0; x < size; x++)
	{
		table[x] = [];
	}

	for(let xyz = 0; xyz < count_y; xyz++)
	{
		for(let xyz2 = 0; xyz2 < count_x; xyz2++)
		{
			for(let xyz3 = 1; xyz3 <= size; xyz3++)
			{
					if(chk_ver(xyz, xyz2, xyz3) || chk_hor(xyz2, xyz, xyz3) || chk_sqr(xyz2, xyz, xyz3))
					{
						console.log("Error");
						console.log(xyz);
						console.log(xyz2);
						console.log(xyz3);
						xyz = 0;
						xyz2 = 0;
						xyz3 = 0;

						for(let x = 0; x < size; x++)
						{
							table[x] = [];
						}

						for(let x = 0; x < count_x; x++)
						{
							for(let x1 = 0; x1 < count_y; x1++)
							{
								for(let z = 0; z <  size; z++)
								{
									z = fill(x ,x1, z);
								}
							}
						}
					}
			}
		}
	}

	for(let x =  0; x < count_x; x++)
	{
		for(let y = 0; y < count_y; y++)
		{
			for(let z = 0; z < size/3 + parseFloat(document.querySelector("#difficulty").value); z++)
			{
				let y1 = Math.round(Math.random() * (count_x-1));
				let x1 = Math.round(Math.random() * (count_y-1));
				table[x*count_y + x1][y*count_x + y1] = undefined;
			}
		}
	}
	
	var board = document.createElement("table");
	board.id = "board";
	var sudoku = document.querySelector("#sudoku");
	sudoku.appendChild(board);

	for(let x = 0; x < count_x; x++) 
	{
		var tr = document.createElement("tr");
		board.appendChild(tr);

		for(let y = 0; y < count_y; y++) 
		{
			var td = document.createElement("td");
			td.className = "outer";
			board.appendChild(td);
			var table = document.createElement("table")
			td.appendChild(table);

			for(let x1 = 0; x1 < count_y; x1++) 
			{
				var tr = document.createElement("tr");
				table.appendChild(tr);

				for(let y1 = 0; y1 < count_x; y1++) 
				{
					var td = document.createElement("td");
					td.style.width = 
					td.className = "inner";
					tr.appendChild(td);

					if(table[x*count_y + x1][y*count_x + y1] === undefined)
					{
						var input = document.createElement("input");
						input.id = "S" + (y * count_x + y1 + (x * count_y + x1) * 10 ** size);
						input.type = "number";
						input.min = 1;
						input.max = size;
						td.appendChild(input);
					}
					else
					{
						td.id = "S" + (y * 3 + y1 + (x * 3 + x1) * 10 ** size);
						td.innerHTML = table[x*count_y + x1][y*count_x + y1];
					}
				}
			}
		}
	}
}

var gen = document.querySelector("#gen");
gen.addEventListener("click", gener);

var chk = document.querySelector("#chk");
chk.addEventListener("click", score_f);
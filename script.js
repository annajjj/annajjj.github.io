var previousScreenX = 0;

window.onload = function() {
    createNode("div", "container", "welcome-page", views["welcome-page"], true);

    const menuItems = document.querySelectorAll(".menu-entry");
    menuItems.forEach(item => {
        const hideMenuFlag = item.id === "menu-item-settings" ? true : false;
        const hideSettings = item.id === "menu-item-settings" ? true : false;
        item.addEventListener("click", () => changePage(item, menuNavigation[item.id], true, hideMenuFlag, hideSettings));
    });

    setTimeout(() => {
        const welcomePage = document.getElementById("welcome-page");
        changePage(welcomePage, "dashboard-page", true, false);
        document.getElementById("menu-item-settings").style.display = "block";
    },1000)
}

function createNode(tag, parent, id, content) {
    const node = document.createElement(tag);
    node.innerHTML = content;
    node.id = id;
    node.classList.add("content-item");
    document.getElementById(parent).appendChild(node);
}

function changePage(currentPage, nextPage, changeNav = false, hideMenuFlag = false, hideSettings = false){
    setMenuItemActive(currentPage, changeNav)
    removePreviousNode();
    toggleMenu(hideMenuFlag);
    toggleSettings(hideSettings)
    createNode("div", "container", nextPage, views[nextPage]);
}

function setMenuItemActive(currentPage, changeNav){
    if(changeNav){
        const previousActiveParent = document.querySelector('.content-item').id;
        const previousActive  = document.getElementById(`menu-item-${previousActiveParent.split('-')[0]}`);
        if(previousActive){
            previousActive.childNodes[1].classList.toggle("active")
            if(previousActiveParent!="settings-page" && currentPage.childNodes[1]) currentPage.childNodes[1].classList.toggle("active")
            else if(previousActiveParent!="transactions-page-manual-add")document.getElementById("menu-item-dashboard").childNodes[1].classList.toggle("active");
        }
    }
}

function toggleSettings(hideSettings){
    const settings = document.getElementById("menu-item-settings");
    if(hideSettings) settings.style.display = "none";
    else settings.style.display = "block";
}

function toggleMenu(hideMenuFlag){
    const menu = document.getElementById("menu");
    if(hideMenuFlag){
        menu.style.bottom = "-70px";
        menu.style.opacity = "0";
    }
    else{
        menu.style.bottom = "0px";
        menu.style.opacity = "1";
    }
}

function removePreviousNode(){
    const childNode = document.querySelector('.content-item');
    document.getElementById("container").removeChild(childNode);
}

function raportsMoneyTypeChange(checkbox){
    const chart = checkbox.id === "expenses" ? document.getElementById("expenses-chart") : document.getElementById("outcomes-chart");
    if(checkbox.checked){
        chart.style.visibility = "visible";
        chart.style.opacity = "1";
    }
    else{
        chart.style.visibility = "hidden";
        chart.style.opacity = "0";
    }
}

function onTouchStartTransaction(event){
    const touch = event.touches[0];
    previousScreenX = touch.screenX;
}

function onTouchMoveTransaction(event,elementId){
    const touch = event.touches[0];
    currentScreenX = touch.screenX;
    const node = document.getElementById(elementId);
    const width = node.style.width.split(/%/)[0];
    if((currentScreenX < previousScreenX) && (+width > 80) && (nodeName="DIV")){
        node.style.width = `${width - 1}%`;
        node.childNodes[9].style.display = "flex";
    }
    previousScreenX = currentScreenX;
}

function onTouchEndTransaction(event, elementId){
    const node = document.getElementById(elementId);
    node.style.width = '100%';
    node.childNodes[9].style.display = "none";
}

const views = {
    "welcome-page": `
        <h1>HOME BUDGET</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="376.654" height="290.717" viewBox="0 0 376.654 290.717">
            <g transform="translate(0.5 -521.783)">
            <path id="Path_7" data-name="Path 7" d="M0,778.91,63.955,626.763l129.257-66.648L243.7,626.763l60.589-74.727,55.2-29.621,14.811,17.5V810.551H0Z" fill="rgba(220,147,223,0.64)" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
            <path id="Path_5" data-name="Path 5" d="M0,812V718.32l94.923-35.68L137.336,706.2l77.42-40.393,30.968-13.464,26.255,13.464,63.955-20.87,39.72-32.314V812Z" fill="rgba(205,145,230,0.67)" stroke="rgba(255,254,254,0.5)" stroke-width="1"/>
            <path id="Path_6" data-name="Path 6" d="M0,748.615,92.9,718.32l68.668-45.105,40.393,42.413,73.38-12.118,49.145-98.963,49.818,47.125V810.551H0Z" fill="#d5a6e8" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
            </g>
        </svg>`,
    "dashboard-page": `
        <h2>Maj 2019</h2>
        <div class="bilans"><div class="bilans-text">2054,38 zł</div></div>
        <ul class="dicount-list">
            <li class="tile flex-center discount-item">Chleb w żabce</li>
            <li class="tile flex-center discount-item">Kosmetyki w Rossmanie</li>
            <li class="tile flex-center discount-item">Więcej...</li>
        </ul>
    `,
    "settings-page": `
        <div class="top background-transparent">
            <h3 class="white">Ustawienia</h3>
            <div class="arrow-back" onclick="changePage(this, 'dashboard-page', true, false, false)"></div>
        </div>
        <div>
        <div class="content paddingTop-big">
            <ul class="settings-page-settings-list">
                <li class="tile flex-center">Synchronizacja z kontem bankowym</li>
                <li class="tile flex-center">Powiadomienia</li>
                <li class="tile flex-center">Dziel budżet ze znajomymi</li>
                <li class="tile flex-center"></li>
                <li class="tile flex-center"></li>
            </ul>
        </div>
    `,
    "wallet-page": `
        <div class="top">
            <h3>Budżety</h3>
        </div>
        <div class="content">
            <div class="wallet-page-add-wallet-button-wrapper">
                <button class="wallet-page-add-wallet-button"  onclick="changePage(this, 'wallet-page-wallet-add', false, false, true)">+ Dodaj</button>
            </div>
            <ul class="wallet-page-wallets-list">
                <li class="tile flex-center" onclick="changePage(this, 'wallet-page-wallet-change', false, false, true)">
                    <div class="category flex-grow-1 eating"></div>
                    <div class="wallet-page-wallets-item-name">jedzenie</div>
                    <div class="wallet-page-wallets-item-money">500 PLN</div>
                </li>
                <li class="tile flex-center" onclick="changePage(this, 'wallet-page-wallet-change', false, false, true)">
                    <div class="category flex-grow-1 entertainment"></div>
                    <div class="wallet-page-wallets-item-name">rozrywka</div>
                    <div class="wallet-page-wallets-item-money">250 PLN</div>
                </li>
            </ul>
        </div>
    `,
    "add-transaction-page": `
        <div class="top">
            <h3>Dodaj transakcje</h3>
        </div>
        <div class="content marginTop-big">
            <div class="tile flex-center add-transaction-page-button" onclick="changePage(this, 'transactions-page-manual-add', false, false, true)">wprowadź ręcznie</div>
            <div class="tile flex-center add-transaction-page-button">zeskanuj paragon</div>
        </div>
    `,
    "transactions-page-manual-add": `
        <div class="top">
            <h3>Dodaj transakcje</h3>
            <h5 onclick="changePage(this, 'transactions-page', true, false, false)">Zapisz</h5>
            <div class="arrow-back" onclick="changePage(this, 'add-transaction-page', true, false, false)"></div>
        </div>
        <div class="content">
        <div class="add-transaction-manual-page-type-wrapper">
            <input name="transaction-type" type="radio" id="manual" checked="checked"><label for="manual" class="tile flex-center add-transaction-manual-page-type-button">Przychód</label>
            <input name="transaction-type" type="radio" id="scan"><label for="scan" class="tile flex-center add-transaction-manual-page-type-button">Wydatek</label>
        </div> 
        <h4 class="command">wpisz kwotę</h4> 
        <div class="tile flex-center add-transaction-manual-page-transaction-money">
            <input type=number>
            <div class="bold"> PLN</div>
        </div>
        <h4 class="command">dodaj kategorię</h4> 
        <ul class="add-transaction-manual-page-transaction-category-panel">
            <li><div class="category eating"></div><div>jedzenie</div></li>
            <li><div class="category transport"></div><div>komunikacja miejska</div></li>
            <li><div class="category constant"></div><div>opłaty stałe</div></li>
            <li><div class="category entertainment"></div><div>rozrywka</div></li>
            <li><div class="category office"></div><div>artykuły biurowe</div></li>
            <li><div class="category cloth"></div><div>ubrania</div></li>
            <li><div class="category cosmetics"></div><div>kosmetyki</div></li>
            <li><div class="category house"></div><div>wyposażenie domu</div></li>
        </ul>
        <h4 class="command">stwórz własną kategorię</h4> 
        <div class="tile flex-center add-transaction-manual-page-transaction-new-category-panel">
            <div class="add-transaction-manual-page-transaction-new-category-panel-picker-wrapper">
                <!-- <div class="category edit"></div> -->
                <label class="category edit"><input type="checkbox">
                    <ul class="tile flex-center add-transaction-manual-page-transaction-new-category-panel-icon">
                            <li class="category child"></li>
                            <li class="category cloud"></li>
                            <li class="category favourite"></li>
                            <li class="category music"></li>
                            <li class="category pet"></li>
                            <li class="category shot"></li>
                            <li class="category star"></li>
                            <li class="category work"></li>
                            <li class="category casino"></li>
                            <li class="category mood"></li>
                            <li class="category terrain"></li>
                            <li class="category call"></li>
                            <li class="category spa"></li>
                            <li class="category priority"></li>
                            <li class="category school"></li>
                        </ul>
                </label>
                <label class="category colorPicker"><input type="color"></label>
            </div>
            <input>   
        </div>
    </div>`,
    "reports-page": `
        <div class="top">
            <h3>Raporty</h3>
        </div>
        <div class="content">
            <div class="raports-page-filters">
                <select class="raports-page-filters-item filter-date">
                    <option value="201903">Marzec 2019</option>
                    <option value="201904">Kwiecień 2019</option>
                    <option value="201905">Maj 2019</option>
                </select>
                <select class="raports-page-filters-item filter-category">
                    <option value="jedzenie">jedzenie</option>
                    <option value="ubrania">ubrania</option>
                    <option value="opłaty_stałe">opłaty stałe</option>
                    <option value="rozrywka">rozrywka</option>
                </select>
                <div class="raports-page-filters-money-type">
                    <input name="money-type" type="checkbox" id="outcomes" checked="checked" onchange="raportsMoneyTypeChange(this)"><label for="outcomes"
                        class="tile flex-center raports-page-filters-money-type-item">Dochody</label>
                    <input name="money-type" type="checkbox" id="expenses" checked="checked" onchange="raportsMoneyTypeChange(this)"><label for="expenses"
                        class="tile flex-center raports-page-filters-money-type-item">Wydatki</label>
                </div>
            </div>
            <div class="raports-page-chart">
                <svg xmlns="http://www.w3.org/2000/svg" width="306.5" height="355.5" viewBox="0 0 306.5 355.5">
                    <g id="Symbol_4_1" data-name="Symbol 4 – 1" transform="translate(-21 -143.5)">
                        <line id="Line_9" data-name="Line 9" y2="355" transform="translate(21.5 143.5)" fill="none"
                            stroke="#e6cee6" stroke-width="1" />
                        <line id="Line_10" data-name="Line 10" x2="306" transform="translate(21.5 498.5)"
                            fill="none" stroke="#e6cee6" stroke-width="1" />
                    </g>
                </svg>
                <svg class="raports-page-chart-plot" id="expenses-chart" xmlns="http://www.w3.org/2000/svg" width="305.904" height="297.028"
                    viewBox="0 0 305.904 297.028">
                    <path id="Path_23" data-name="Path 23"
                        d="M466.5,1721.5l21.83-103.621,57.048-117.519,21.678,117.519,30.806-28.524,66.176,42.215,35.37-206.513v139.2l26.079,20.079,25.264,18.714,20.537,28.524v89.93Z"
                        transform="translate(-465.884 -1424.972)" fill="rgba(209,162,210,0.41)"
                        stroke="rgba(255,252,252,0.5)" stroke-width="1" />
                </svg>
                <svg class="raports-page-chart-plot" id="outcomes-chart" xmlns="http://www.w3.org/2000/svg" width="45.083" height="307.46" viewBox="0 0 45.083 307.46">
                    <g id="Symbol_3_1" data-name="Symbol 3 – 1" transform="translate(-20.47 -192.886)">
                        <path id="Path_24" data-name="Path 24" d="M483.766,1415.929l26.242,306.918H466Z"
                            transform="translate(-445 -1223)" fill="#a8dbbc" stroke="rgba(255,255,255,0.5)"
                            stroke-width="1" opacity="0.5" />
                    </g>
                </svg>
            </div>
            <ul class="raports-page-summary">
                <li>Najwyższe dzienne wydatki <strong>899zł</strong></li>
                <li>Najniższe dzienne wydatki <strong>14.43zł</strong></li>
                <li>Średnie dzienne wydatki <strong>83.12zł</strong></li>
                <li>Suma wydatków <strong>2081.67zł</strong></li>
                <li>Suma dochodów <strong>3679zł</strong></li>
            </ul>
        </div>`,
    "transactions-page": `
            <div class="top">
                <h3>Transakcje</h3>
            </div>
            <div class="content marginTop-big">
                <ul>
                    <li>
                        <div class="transactions-page-date"> 28 marca 2019</div>
                        <ul>
                            <li id="transaction-list-transaction-1" class="tile flex-center" style="width:100%" draggable="true" ontouchstart="onTouchStartTransaction(event)" ontouchmove="onTouchMoveTransaction(event,'transaction-list-transaction-1')" ontouchend="onTouchEndTransaction(event, 'transaction-list-transaction-1')">
                                <div class="category flex-grow-1 entertainment"></div>
                                <div class="transactions-page-transaction-item-name">bilety na koncert</div>
                                <div class="transactions-page-transaction-item-money">-300 zł</div>
                                <div class="category more" onclick="changePage(this, 'transactions-page-transaction-edit', false, false, true)"></div>
                                <div class="transaction-page-transaction-remove">
                                    <div class="category remove"></div>
                                </div>
                            </li>
                            <li id="transaction-list-transaction-2" class="tile flex-center" style="width:100%" draggable="true" ontouchstart="onTouchStartTransaction(event)" ontouchmove="onTouchMoveTransaction(event,'transaction-list-transaction-2')" ontouchend="onTouchEndTransaction(event, 'transaction-list-transaction-2')">
                                <div class="category flex-grow-1 eating"></div>
                                <div class="transactions-page-transaction-item-name">Kaufland</div>
                                <div class="transactions-page-transaction-item-money">-58.75 zł</div>
                                <div class="category more" onclick="changePage(this, 'transactions-page-transaction-edit', false, false, true)"></div>
                                <div class="transaction-page-transaction-remove">
                                    <div class="category remove"></div>
                                </div>
                            </li>
                            <li id="transaction-list-transaction-3" class="tile flex-center" style="width:100%" draggable="true" ontouchstart="onTouchStartTransaction(event)" ontouchmove="onTouchMoveTransaction(event,'transaction-list-transaction-3')" ontouchend="onTouchEndTransaction(event, 'transaction-list-transaction-3')">
                                <div class="category flex-grow-1 money"></div>
                                <div class="transactions-page-transaction-item-name">Wypłata</div>
                                <div class="transactions-page-transaction-item-money">3578 zł</div>
                                <div class="category more" onclick="changePage(this, 'transactions-page-transaction-edit', false, false, true)"></div>
                                <div class="transaction-page-transaction-remove">
                                    <div class="category remove"></div>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="transactions-page-date"> 26 marca 2019</div>
                        <ul>
                            <li id="transaction-list-transaction-4" class="tile flex-center" style="width:100%" draggable="true" ontouchstart="onTouchStartTransaction(event)" ontouchmove="onTouchMoveTransaction(event,'transaction-list-transaction-4')" ontouchend="onTouchEndTransaction(event, 'transaction-list-transaction-4')">
                                <div class="category flex-grow-1 house"></div>
                                <div class="transactions-page-transaction-item-name">Zasłony</div>
                                <div class="transactions-page-transaction-item-money">-450 zł</div>
                                <div class="category more" onclick="changePage(this, 'transactions-page-transaction-edit', false, false, true)"></div>
                                <div class="transaction-page-transaction-remove">
                                    <div class="category remove"></div>
                                </div>
                            </li>
                            <li id="transaction-list-transaction-5" class="tile flex-center" style="width:100%" draggable="true" ontouchstart="onTouchStartTransaction(event)" ontouchmove="onTouchMoveTransaction(event,'transaction-list-transaction-5')" ontouchend="onTouchEndTransaction(event, 'transaction-list-transaction-5')">
                                <div class="category flex-grow-1 eating"></div>
                                <div class="transactions-page-transaction-item-name">Żabka</div>
                                <div class="transactions-page-transaction-item-money">-21.34 zł</div>
                                <div class="category more" onclick="changePage(this, 'transactions-page-transaction-edit', false, false, true)"></div>
                                <div class="transaction-page-transaction-remove">
                                    <div class="category remove"></div>
                                </div>
                            </li>
                            <li id="transaction-list-transaction-6" class="tile flex-center" style="width:100%" draggable="true" ontouchstart="onTouchStartTransaction(event)" ontouchmove="onTouchMoveTransaction(event,'transaction-list-transaction-6')" ontouchend="onTouchEndTransaction(event, 'transaction-list-transaction-6')">
                                <div class="category flex-grow-1 cloth"></div>
                                <div class="transactions-page-transaction-item-name">HM</div>
                                <div class="transactions-page-transaction-item-money">-99.99 zł</div>
                                <div class="category more" onclick="changePage(this, 'transaction-page-transaction-edit', false, false, true)"></div>
                                <div class="transaction-page-transaction-remove">
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
    `,
    "transactions-page-transaction-edit": `
            <div class="top">
                <h3>Edytuj transakcje</h3>
                <h5 onclick="changePage(this, 'transactions-page', false, false, false)">Zapisz</h5>
                <div class="arrow-back" onclick="changePage(this, 'transactions-page', false, false, false)"></div>
            </div>
            <div class="content">
                <div class="add-transaction-manual-page-type-wrapper">
                    <input name="transaction-type" type="radio" id="manual"><label for="manual"
                        class="tile flex-center add-transaction-manual-page-type-button">Przychód</label>
                    <input name="transaction-type" type="radio" id="scan" checked="checked"><label for="scan"
                        class="tile flex-center add-transaction-manual-page-type-button">Wydatek</label>
                </div>
                <h4 class="command">edytuj nazwę</h4>
                <div class="tile flex-center add-transaction-manual-page-transaction-money">
                    <input value="Kaufland">
                </div>
                <h4 class="command">edytuj kwotę</h4>
                <div class="tile flex-center add-transaction-manual-page-transaction-money">
                    <input type="number" value="245.67">
                    <div class="bold"> PLN</div>
                </div>
                <h4 class="command">zmień kategorię</h4>
                <ul class="add-transaction-manual-page-transaction-category-panel">
                    <li>
                        <div class="category eating"></div>
                        <div>jedzenie</div>
                    </li>
                    <li>
                        <div class="category transport"></div>
                        <div>komunikacja miejska</div>
                    </li>
                    <li>
                        <div class="category constant"></div>
                        <div>opłaty stałe</div>
                    </li>
                    <li>
                        <div class="category entertainment"></div>
                        <div>rozrywka</div>
                    </li>
                    <li>
                        <div class="category office"></div>
                        <div>artykuły biurowe</div>
                    </li>
                    <li>
                        <div class="category cloth"></div>
                        <div>ubrania</div>
                    </li>
                    <li>
                        <div class="category cosmetics"></div>
                        <div>kosmetyki</div>
                    </li>
                    <li>
                        <div class="category house"></div>
                        <div>wyposażenie domu</div>
                    </li>
                </ul>
                <h4 class="command">stwórz własną kategorię</h4>
                <div class="tile flex-center add-transaction-manual-page-transaction-new-category-panel">
                    <div class="add-transaction-manual-page-transaction-new-category-panel-picker-wrapper">
                        <!-- <div class="category edit"></div> -->
                        <label class="category edit"><input type="checkbox">
                            <ul
                                class="tile flex-center add-transaction-manual-page-transaction-new-category-panel-icon">
                                <li class="category child"></li>
                                <li class="category cloud"></li>
                                <li class="category favourite"></li>
                                <li class="category music"></li>
                                <li class="category pet"></li>
                                <li class="category shot"></li>
                                <li class="category star"></li>
                                <li class="category work"></li>
                                <li class="category casino"></li>
                                <li class="category mood"></li>
                                <li class="category terrain"></li>
                                <li class="category call"></li>
                                <li class="category spa"></li>
                                <li class="category priority"></li>
                                <li class="category school"></li>
                            </ul>
                        </label>
                        <label class="category colorPicker"><input type="color"></label>
                    </div>
                    <input>
                </div>
            </div>`,
    "wallet-page-wallet-change": `
        <div class="top">
            <h3>Edytuj budżet</h3>
            <h5 onclick="changePage(this, 'wallet-page', false, false, false)">Zapisz</h5>
            <div class="arrow-back" onclick="changePage(this, 'wallet-page', false, false, false)"></div>
        </div>
        <div class="content marginTop-big">
            <div class="wallet-page-wallet-change-command-wrapper command"> 
                <h4>ustaw maksimum</h4> 
                <div class="wallet-page-wallet-change-category-wrapper">
                    <div class="category-text">rozrywka</div>
                    <div class="category flex-grow-1 entertainment"></div>
                </div>
            </div>
            <div class="tile center wallet-page-wallet-change-item-money">
                <input type=number value="250">
                <div class="bold"> PLN</div>
            </div>
        </div>`,
        "wallet-page-wallet-add": `
            <div class="top">
                    <h3>Dodaj budżet</h3>
                    <h5 onclick="changePage(this, 'wallet-page', false, false, false)">Zapisz</h5>
                    <div class="arrow-back" onclick="changePage(this, 'wallet-page', false, false, false)"></div>
                </div>
                <div class="content marginTop-big">
                <h4>ustaw maksimum</h4>  
                <div class="tile wallet-page-wallet-change-item-money">
                    <input type=number value="250">
                    <div class="bold"> PLN</div>
                </div>
                    <h4>wybierz kategorię</h4>  
                    <ul class="add-transaction-manual-page-transaction-category-panel">
                    <li>
                        <div class="category eating"></div>
                        <div>jedzenie</div>
                    </li>
                    <li>
                        <div class="category transport"></div>
                        <div>komunikacja miejska</div>
                    </li>
                    <li>
                        <div class="category constant"></div>
                        <div>opłaty stałe</div>
                    </li>
                    <li>
                        <div class="category entertainment"></div>
                        <div>rozrywka</div>
                    </li>
                    <li>
                        <div class="category office"></div>
                        <div>artykuły biurowe</div>
                    </li>
                    <li>
                        <div class="category cloth"></div>
                        <div>ubrania</div>
                    </li>
                    <li>
                        <div class="category cosmetics"></div>
                        <div>kosmetyki</div>
                    </li>
                    <li>
                        <div class="category house"></div>
                        <div>wyposażenie domu</div>
                    </li>
                </ul>

                </div>`,    
}

const menuNavigation = {
    "menu-item-settings": "settings-page",
    "menu-item-dashboard": "dashboard-page",
    "menu-item-wallet": "wallet-page",
    "menu-item-add": "add-transaction-page",
    "menu-item-reports": "reports-page",
    "menu-item-transactions": "transactions-page"
}
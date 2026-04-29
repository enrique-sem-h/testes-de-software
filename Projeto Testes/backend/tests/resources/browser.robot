*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${BASE_URL}    http://localhost:3000    

*** Keywords ***
Abrir Navegador
    Open Browser    ${BASE_URL}    chrome
    Maximize Browser Window

Fechar Navegador
    Close Browser

*** Settings ***
Resource    resources/browser.robot
Library     SeleniumLibrary

*** Test Cases ***

Login com sucesso
    [Setup]    Abrir Navegador
    Go To    ${BASE_URL}/login
    Input Text    id:email    mariana1@example.com
    Input Text    id:senha    123456
    Click Button    xpath=//button[text()="Entrar"]
    Wait Until Location Is    ${BASE_URL}/dashboard
    [Teardown]    Fechar Navegador

Login com senha incorreta
    [Setup]    Abrir Navegador
    Go To    ${BASE_URL}/login
    Input Text    id:email    mariana1@example.com
    Input Text    id:senha    12345
    Click Button    xpath=//button[text()="Entrar"]
    Wait Until Page Contains Element    css:.error
    Wait Until Page Contains    Senha incorreta.
    [Teardown]    Fechar Navegador

Login com email vazio
    [Setup]    Abrir Navegador
    Go To    ${BASE_URL}/login
    Input Text    id:email    ${EMPTY}    
    Input Text    id:senha    123456
    Click Button    xpath=//button[text()="Entrar"]
    Wait Until Page Contains Element    css:.error
    Page Should Contain    Preencha todos os campos.
    [Teardown]    Fechar Navegador

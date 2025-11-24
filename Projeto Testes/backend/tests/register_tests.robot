*** Settings ***
Resource    resources/browser.robot
Library     SeleniumLibrary

*** Test Cases ***

Cadastro com sucesso
    [Setup]    Abrir Navegador
    Go To    ${BASE_URL}/register
    Input Text    id:name    Teste Usuário
    Input Text    id:email    teste100@example.com
    Input Text    id:password    123456
    Input Text    id:confirmPassword    123456
    Click Button    xpath=//button[text()="Cadastrar"]
    Wait Until Location Is    ${BASE_URL}/login
    [Teardown]    Fechar Navegador

Cadastro com senhas diferentes
    [Setup]    Abrir Navegador
    Go To    ${BASE_URL}/register
    Input Text    id:name    Usuário Teste
    Input Text    id:email    usuario@example.com
    Input Text    id:password    123456
    Input Text    id:confirmPassword    654321
    Click Button    xpath=//button[text()="Cadastrar"]
    Wait Until Page Contains Element    css:.error
    Page Should Contain    senhas não coincidem
    [Teardown]    Fechar Navegador

Cadastro com email inválido
    [Setup]    Abrir Navegador
    Go To    ${BASE_URL}/register
    Input Text    id:name    Usuário Teste
    Input Text    id:email    email-invalido
    Input Text    id:password    123456
    Input Text    id:confirmPassword    123456
    
    Execute JavaScript    document.getElementById('email').setAttribute('type', 'text')
    Execute JavaScript    document.getElementById('email').removeAttribute('required')
    
    Click Button    xpath=//button[text()="Cadastrar"]
    Wait Until Page Contains Element    css:.error
    [Teardown]    Fechar Navegador
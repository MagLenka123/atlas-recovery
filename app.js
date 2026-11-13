
const I18N={pl:{skip:'Przejdź do treści',language:'Język',navOverview:'PRZEGLĄD',navVersions:'HISTORIA WERSJI',integrity:'INTEGRALNOŚĆ',overviewTitle:'CZĘŚCIOWE ODZYSKIWANIE',overviewLead:'Wykryto uszkodzoną historię wersji. Relacje między rekordami wymagają ręcznej weryfikacji.',systemState:'STAN SYSTEMU',owner:'WŁAŚCICIEL',records:'ODZYSKANE REKORDY',broken:'USZKODZONE RELACJE',ownerNote:'Jeżeli historia jest uszkodzona, zacznij od pierwszej wersji.',openRecovery:'OTWÓRZ ODZYSKIWANIE WERSJI',versionsTitle:'ODTWARZANIE HISTORII',versionsLead:'Zweryfikuj pochodzenie kolejnych rekordów.',versionLabel:'WERSJA',verify:'ZWERYFIKUJ',disclosureTitle:'PAKIET UJAWNIENIOWY',audioTitle:'NOTATKI GŁOSOWE',showTranscript:'POKAŻ TRANSKRYPCJĘ',hideTranscript:'UKRYJ TRANSKRYPCJĘ',deliveryTitle:'STATUS WYSYŁKI',helpTitle:'POMOC ŚLEDCZA',nextHint:'NASTĘPNA WSKAZÓWKA',close:'ZAMKNIJ',resetTitle:'RESET POSTĘPU',resetText:'Usunąć lokalny stan odzyskiwania?',cancel:'ANULUJ',reset:'RESETUJ',resetLocal:'RESET LOCAL RECOVERY STATE',questions:['Podaj wersję początkową.','Która wersja została utworzona z v03?','Która wersja została utworzona z v07?','Która wersja została utworzona z v11?','Która wersja zamyka odzyskany łańcuch?'],summaries:['Utworzono listę raportów przeznaczonych do analizy.','Dodano porównanie wcześniejszych wersji dokumentów.','Dodano identyfikatory zatwierdzające operacje.','Dodano operacje wykonane po formalnym zamknięciu raportów.','Utworzono pakiet ujawnienia.'],bad:'RELACJA NIEPOTWIERDZONA. Wybrany rekord nie odpowiada odzyskanym danym.',good:'REKORD ZWERYFIKOWANY',complete:'HISTORIA ODTWORZONA',transcript:'Jeżeli nie zadzwonię do Leny do dziewiątej, procedura ruszy sama. Spotkanie ma być ostatnią szansą na wyjaśnienie tych zmian. Telefon zostawiam przed strefą.',legal:`PLANOWANA WYSYŁKA:
wtorek, 09:00

ODBIORCY:
Zarząd Sentinel Dynamics
Kancelaria Wolska i Partnerzy

TEMAT:
Nieautoryzowane zmiany w raportach incydentów

Załączam pełną historię wersji oraz operacje wykonane z identyfikatora kierowniczego osoby odpowiedzialnej za bezpieczeństwo operacyjne.

Przed przekazaniem dokumentacji zamierzam dać tej osobie możliwość złożenia wyjaśnień.

Spotkanie:
poniedziałek, 08:25
DC03`,hints:['Brakuje informacji z fizycznego dokumentu opisującego relacje wersji.','Sprawdź kartę ATLAS i zapis „utworzono z”.','Wersją początkową jest v03. Następne rekordy to v07, v11, v15 i v04.']},en:{skip:'Skip to content',language:'Language',navOverview:'OVERVIEW',navVersions:'VERSION HISTORY',integrity:'INTEGRITY',overviewTitle:'PARTIAL RESTORE',overviewLead:'A damaged version history was detected. Relations between records require manual verification.',systemState:'SYSTEM STATE',owner:'OWNER',records:'RECOVERED RECORDS',broken:'BROKEN RELATIONS',ownerNote:'If the history is damaged, begin with the first version.',openRecovery:'OPEN VERSION RECOVERY',versionsTitle:'HISTORY RECOVERY',versionsLead:'Verify the origin of each record.',versionLabel:'VERSION',verify:'VERIFY',disclosureTitle:'DISCLOSURE PACKAGE',audioTitle:'AUDIO NOTES',showTranscript:'SHOW TRANSCRIPT',hideTranscript:'HIDE TRANSCRIPT',deliveryTitle:'DELIVERY STATUS',helpTitle:'INVESTIGATION HELP',nextHint:'NEXT HINT',close:'CLOSE',resetTitle:'RESET PROGRESS',resetText:'Delete the local recovery state?',cancel:'CANCEL',reset:'RESET',resetLocal:'RESET LOCAL RECOVERY STATE',questions:['Enter the initial version.','Which version was created from v03?','Which version was created from v07?','Which version was created from v11?','Which version closes the recovered chain?'],summaries:['Created the list of reports selected for analysis.','Added comparison of previous document versions.','Added identifiers used to approve operations.','Added operations performed after reports were formally closed.','Created the disclosure package.'],bad:'RELATION NOT VERIFIED. The selected record does not match the recovered data.',good:'RECORD VERIFIED',complete:'HISTORY RESTORED',transcript:'If I do not call Lena by nine, the procedure will start on its own. The meeting is supposed to be the last chance to explain these changes. I am leaving my phone outside the zone.',legal:`SCHEDULED DELIVERY:
Tuesday, 09:00

RECIPIENTS:
Sentinel Dynamics Board
Wolska i Partnerzy

SUBJECT:
Unauthorized changes to incident reports

I am attaching the complete version history and operations performed with the management identifier assigned to the person responsible for operational security.

Before delivering the documentation, I intend to give that person one opportunity to provide an explanation.

Meeting:
Monday, 08:25
DC03`,hints:['Information is missing from the physical document describing version relations.','Check the ATLAS sheet and the phrase “created from”.','The initial version is v03. The next records are v07, v11, v15 and v04.']}};
const answers=['03','07','11','15','04'],ids=['v03','v07','v11','v15','v04-R'];
let state=JSON.parse(localStorage.getItem('atlas-state')||'{"step":0,"errors":0,"lang":"pl"}');
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function t(){return I18N[state.lang]}
function save(){localStorage.setItem('atlas-state',JSON.stringify(state))}
function translate(){document.documentElement.lang=state.lang;$('#lang').value=state.lang;$$('[data-i18n]').forEach(el=>{let k=el.dataset.i18n;if(t()[k])el.textContent=t()[k]});$('#legalText').textContent=t().legal;$('#transcript').textContent=t().transcript;renderRecovery()}
function route(name){if(['disclosure','audio','delivery','log'].includes(name)&&state.step<5)return;$$('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+name));$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.route===name));$('#main').focus();history.replaceState(null,'','#'+name)}
$$('[data-route]').forEach(b=>b.addEventListener('click',()=>route(b.dataset.route)));
function renderRecovery(){const step=Math.min(state.step,4);$('#stepBadge').textContent=`${Math.min(state.step+1,5)}/5`;$('#stepLabel').textContent=`STEP ${Math.min(state.step+1,5)} OF 5`;$('#stepQuestion').textContent=state.step<5?t().questions[step]:t().complete;$('#chain').innerHTML=ids.map((id,i)=>`<div class="chain-node ${i<state.step?'done':''}">${i<state.step?id:'— — —'}</div>${i<4?'<div class="chain-arrow">↓</div>':''}`).join('');$('#recoveryForm').classList.toggle('hidden',state.step>=5);if(state.step>=5){$('#recoveredDetail').classList.remove('hidden');$('#recoveredDetail').innerHTML=`<b>${t().complete}</b><p>v03 → v07 → v11 → v15 → v04-R</p>`}else{$('#recoveredDetail').classList.add('hidden')}}
$('#recoveryForm').addEventListener('submit',e=>{e.preventDefault();let v=$('#versionInput').value.trim().replace(/^v/i,'').padStart(2,'0');let msg=$('#statusMsg');if(v===answers[state.step]){state.step++;state.errors=0;save();msg.className='status success';msg.textContent=`${t().good} / ${ids[state.step-1]} — ${t().summaries[state.step-1]}`;$('#versionInput').value='';update();renderRecovery()}else{state.errors++;save();msg.className='status error';msg.textContent=t().bad;if(state.errors>=3)msg.textContent+=' '+t().hints[Math.min(Math.floor((state.errors-3)/2),2)]}});
function update(){let pct=20+state.step*16;$('#meterFill').style.width=pct+'%';$('#meterText').textContent=pct+'%';$('#brokenCount').textContent=Math.max(0,4-state.step);let done=state.step>=5;$('#topStatus').textContent=done?'RECOVERY COMPLETE':'PARTIAL RESTORE';$('.dot').classList.toggle('ok',done);$('#stateValue').textContent=done?'RECOVERY COMPLETE':'PARTIAL RESTORE';$('#packageState').textContent=done?'AVAILABLE':'LOCKED';$$('.gated').forEach(n=>{n.classList.toggle('unlocked',done);n.querySelector('em').textContent=done?'AVAILABLE':'LOCKED'});document.title=done?'ATLAS // Recovery Complete':'ATLAS // Partial Restore'}
$('#lang').addEventListener('change',e=>{state.lang=e.target.value;save();translate()});
$('#transcriptBtn').addEventListener('click',()=>{let h=$('#transcript').classList.toggle('hidden');$('#transcriptBtn').textContent=h?t().showTranscript:t().hideTranscript});
let timer=null,secs=0;$('#playAudio').addEventListener('click',()=>{if(timer){clearInterval(timer);timer=null;$('#playAudio').textContent='▶';speechSynthesis.cancel();return}$('#playAudio').textContent='Ⅱ';let utter=new SpeechSynthesisUtterance(t().transcript);utter.lang=state.lang==='pl'?'pl-PL':'en-US';utter.rate=.92;speechSynthesis.speak(utter);timer=setInterval(()=>{secs++;$('#audioProgress').style.width=Math.min(100,secs/17*100)+'%';$('#audioTime').textContent=`00:${String(Math.min(secs,17)).padStart(2,'0')} / 00:17`;if(secs>=17){clearInterval(timer);timer=null;secs=0;$('#playAudio').textContent='▶'}},1000)});
const logs=['11.09 08:59:40  delivery_test initiated','11.09 09:00:14  package delivered','12.09 22:14:03  version graph updated','13.09 19:21:55  disclosure package prepared','14.09 09:00:00  owner check failed','14.09 11:04:00  recovery node published'];$('#systemLog').innerHTML=logs.map(x=>{let [d,tm,...r]=x.split(' ');return `<div class="log-row"><time>${d} ${tm}</time><span>${r.join(' ')}</span></div>`}).join('');
let hint=0;$('#helpBtn').addEventListener('click',()=>{hint=0;$('#helpBody').textContent=t().hints[hint];$('#helpDialog').showModal()});$('#nextHint').addEventListener('click',()=>{$('#helpBody').textContent=t().hints[Math.min(++hint,2)]});
$('#resetBtn').addEventListener('click',()=>$('#resetDialog').showModal());$('#confirmReset').addEventListener('click',()=>{localStorage.removeItem('atlas-state');location.reload()});
setTimeout(()=>$('#boot').classList.add('hide'),900);translate();update();let hash=location.hash.slice(1);if(hash)route(hash);

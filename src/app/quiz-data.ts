export type ProfileId='trilha'|'mar'|'cidade'|'refugio';
export interface Profile {id:ProfileId;name:string;tag:string;title:string;description:string;ideas:readonly string[];color:string;}
export interface Choice {id:string;label:string;detail:string;profile:ProfileId;symbol:string;}
export interface Question {id:string;eyebrow:string;title:string;hint:string;options:readonly Choice[];}
export const PROFILES:readonly Profile[]=[
{id:'trilha',name:'Alma de trilha',tag:'CAMINHO ABERTO',title:'Seu horizonte tem caminho de terra.',description:'Você se anima com a descoberta que acontece no percurso. Paisagens abertas, movimento e aquela sensação boa de chegar por conta própria combinam com as escolhas que você fez.',ideas:['Um parque com trilhas sinalizadas','Uma pequena cidade entre montanhas','Um roteiro de mirantes ao amanhecer'],color:'#73844b'},
{id:'mar',name:'Maré livre',tag:'TEMPO DE RESPIRAR',title:'Seu relógio acompanha a maré.',description:'Espaço para respirar e liberdade para mudar de ideia aparecem nas suas escolhas. Seu roteiro ideal deixa lugar para a brisa, uma conversa longa e um dia sem tanta pressa.',ideas:['Uma vila à beira-mar','Um passeio de barco tranquilo','Uma tarde de praia com leitura'],color:'#39818b'},
{id:'cidade',name:'Olhar urbano',tag:'CURIOSIDADE EM MOVIMENTO',title:'Toda esquina pode virar uma história.',description:'Você se interessa pelo encontro entre pessoas, sabores e ideias. Sua viagem ganha vida nos pequenos detalhes de uma rua, de uma exposição ou de uma mesa compartilhada.',ideas:['Um bairro com mercados e cafés','Um circuito de museus e arquitetura','Um passeio gastronômico a pé'],color:'#be592f'},
{id:'refugio',name:'Modo refúgio',tag:'O LUXO DA PAUSA',title:'Seu destino favorito tem espaço para ficar.',description:'Conforto e presença importam para você. Suas escolhas sugerem uma viagem que acolhe: um lugar gostoso para ler, cozinhar devagar e aproveitar a companhia sem olhar tanto o relógio.',ideas:['Uma cabana com livros e varanda','Uma pousada em cidade pequena','Um fim de semana de cozinha e descanso'],color:'#786b9a'}
];
export const QUESTIONS:readonly Question[]=[
{id:'amanhecer',eyebrow:'PRIMEIRO DIA',title:'Você abriu a janela. O que quer encontrar?',hint:'Imagine uma manhã sem notificações.',options:[
{id:'a',label:'Montanhas até onde a vista alcança',detail:'O dia já começa chamando para fora.',profile:'trilha',symbol:'△'},
{id:'b',label:'O mar fazendo todo o barulho',detail:'E o café pode esperar mais um pouco.',profile:'mar',symbol:'≈'},
{id:'c',label:'Uma rua que ainda não conheço',detail:'Tem uma padaria acendendo as luzes.',profile:'cidade',symbol:'▦'},
{id:'d',label:'Uma varanda no meio do verde',detail:'Um cobertor e nenhum compromisso.',profile:'refugio',symbol:'⌂'}]},
{id:'mochila',eyebrow:'BAGAGEM DE MÃO',title:'Só cabe mais uma coisa na mochila.',hint:'Qual companhia faz falta no seu roteiro?',options:[
{id:'a',label:'Um livro que estava esperando',detail:'Finalmente vou virar essas páginas.',profile:'refugio',symbol:'▤'},
{id:'b',label:'Uma câmera ou caderno de rua',detail:'Quero guardar o que passar despercebido.',profile:'cidade',symbol:'◎'},
{id:'c',label:'Uma toalha e óculos de sol',detail:'A melhor mala é a que deixa tudo leve.',profile:'mar',symbol:'☼'},
{id:'d',label:'Um bom par de tênis',detail:'Vai que aparece um caminho novo.',profile:'trilha',symbol:'↟'}]},
{id:'tarde',eyebrow:'SEM PRESSA',title:'Uma tarde inteira ficou livre. E agora?',hint:'O roteiro fez um espaço só para você.',options:[
{id:'a',label:'Seguir o cheiro de um mercado',detail:'E provar algo que nunca pedi antes.',profile:'cidade',symbol:'▦'},
{id:'b',label:'Subir até aquele mirante',detail:'O esforço faz parte da lembrança.',profile:'trilha',symbol:'△'},
{id:'c',label:'Ficar mais um pouco na pousada',detail:'A rede está no ponto certo.',profile:'refugio',symbol:'⌂'},
{id:'d',label:'Descobrir uma faixa de areia vazia',detail:'O resto eu decido quando chegar.',profile:'mar',symbol:'≈'}]},
{id:'mesa',eyebrow:'MEMÓRIAS À MESA',title:'Qual convite você aceita primeiro?',hint:'O sabor também faz parte da viagem.',options:[
{id:'a',label:'Peixe fresco com vista para a água',detail:'Pés descalços são bem-vindos.',profile:'mar',symbol:'≈'},
{id:'b',label:'Uma receita feita em casa',detail:'A conversa continua depois da sobremesa.',profile:'refugio',symbol:'⌂'},
{id:'c',label:'Um piquenique depois da caminhada',detail:'Até o sanduíche tem gosto de conquista.',profile:'trilha',symbol:'△'},
{id:'d',label:'O prato mais pedido pelos moradores',detail:'Se tem história, eu quero experimentar.',profile:'cidade',symbol:'▦'}]},
{id:'imprevisto',eyebrow:'MUDANÇA DE PLANOS',title:'Começou a chover. Seu plano B é…',hint:'Todo bom roteiro sabe mudar de direção.',options:[
{id:'a',label:'Chá, janela e uma playlist calma',detail:'Talvez esse fosse o plano A.',profile:'refugio',symbol:'⌂'},
{id:'b',label:'Trocar a trilha por um centro de visitantes',detail:'Ainda quero entender essa paisagem.',profile:'trilha',symbol:'△'},
{id:'c',label:'Um museu que não estava na lista',detail:'A cidade tem outras portas abertas.',profile:'cidade',symbol:'▦'},
{id:'d',label:'Procurar um café perto da orla',detail:'Ver a chuva também é passeio.',profile:'mar',symbol:'≈'}]},
{id:'lembranca',eyebrow:'NA VOLTA',title:'O que você mais quer trazer na memória?',hint:'Escolha a lembrança que faria você sorrir.',options:[
{id:'a',label:'As pessoas e histórias que encontrei',detail:'Meu mapa ganhou novos nomes.',profile:'cidade',symbol:'▦'},
{id:'b',label:'A paz de não precisar fazer nada',detail:'Voltei com espaço na cabeça.',profile:'refugio',symbol:'⌂'},
{id:'c',label:'O horizonte que parecia não acabar',detail:'E a coragem de dar o próximo passo.',profile:'trilha',symbol:'△'},
{id:'d',label:'A liberdade de deixar o dia acontecer',detail:'O melhor plano foi estar presente.',profile:'mar',symbol:'≈'}]}
];
export interface Result {profile:Profile;counts:Record<ProfileId,number>;tied:boolean;}
export function calculateResult(answers:readonly string[]):Result|null {
 if(answers.length!==QUESTIONS.length)return null;
 const counts:Record<ProfileId,number>={trilha:0,mar:0,cidade:0,refugio:0};
 const sequence:ProfileId[]=[];
 for(let i=0;i<QUESTIONS.length;i++){
  const choice=QUESTIONS[i].options.find(o=>o.id===answers[i]);if(!choice)return null;
  counts[choice.profile]++;sequence.push(choice.profile);
 }
 const max=Math.max(...Object.values(counts));const leaders=PROFILES.filter(p=>counts[p.id]===max);
 const winner=sequence.find(id=>leaders.some(p=>p.id===id))!;
 return {profile:PROFILES.find(p=>p.id===winner)!,counts,tied:leaders.length>1};
}

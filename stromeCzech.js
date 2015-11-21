// © copyright 2015 Čeněk Svoboda, svobo.c@gmail.com
// All rights reserved!
d=document;
d.find=function(gg)
{
	return document.getElementById(gg);
};
d.count=function(hh)
{
	return hh.length;
};
d.strom=[];
d.getNodeById=function(id)
{
	var theNode=null;
	d.walk(d.strom,function(jjj){},function(kkk){
		if(kkk.id===id){
			theNode=kkk;
		}
	});
	return theNode;
};
d.getLastId=function(){
	var lastId=0;
	d.walk(d.strom,function(iii){},function(lll){
		if(lll.id>lastId){
			lastId=lll.id;
		}
	});
	return lastId;
};
d.getParent=function(node)
{
	var pNode=false;
	var nId=node.id;
	d.walk(d.strom,function(hhh){},function(mmm){
		if(mmm.children){
			var chico=d.count(mmm.children);
			var lll=0;
			for(;lll<chico;){
				if(mmm.children[lll].id===nId){
					pNode=mmm;
				}
				++lll;
			}
		}
	});
	return pNode;
};
d.addNodeInto=function(node,data)
{
	if(!node.children){
		node.children=[];
	}
	var chiCount=d.count(node.children);
	var theId=d.getLastId();
	node.children[chiCount]={};
	node.children[chiCount].id=(theId+1);
	node.children[chiCount].data=data;
	return (theId+1);
};
d.addNodeBefore=function(node,data)
{
	var nodeId=node.id;
	var par=d.getParent(node);
	if(!par){
		return false;
	}
	var parCou=d.count(par.children);
	var lId=d.getLastId();
	var nnn=parCou-1;
	for(;nnn>=0;){
		if(par.children[nnn].id===nodeId){
			break;
		}
		--nnn;
	}
	par.children.splice(nnn,0,{id:(lId+1),data:data});
	return (lId+1);
};
d.addNodeAfter=function(node,data)
{
	var nodeId=node.id;
	var par=d.getParent(node);
	if(!par){
		return false;
	}
	var parCou=d.count(par.children);
	var lastId=d.getLastId();
	var ooo=parCou-1;
	for(;ooo>=0;){
		if(par.children[ooo].id===nodeId){
			break;
		}
		--ooo;
	}
	par.children.splice(ooo+1,0,{id:(lastId+1),data:data});
	return (lastId+1);
};
d.deleteNode=function(node)
{
	var nodeId=node.id;
	var par=d.getParent(node);
	if(!par){
		return false;
	}
	var parCou=d.count(par.children);
	var ppp=parCou-1;
	for(;ppp>=0;){
		if(par.children[ppp].id===nodeId){
			break;
		}
		--ppp;
	}
	par.children.splice(ppp,1);
	return true;
};
d.getDepth=function(node)
{
	var depth=0;
	for(;;){
		node=d.getParent(node);
		if(!node){
			break;
		}
		++depth;
	}
	return depth;
};
d.walk=function(node,pre,post)
{
	pre(node);
	var children=0;
	if(node.children){
		children=d.count(node.children);
	}
	var iii=0;
	for(;iii<children;){
		d.walk(node.children[iii],pre,post);
		++iii;
	}
	post(node);
};

data segment
number dw 153,21,48,11,656,1,94,13,34,2222
x db 4 dup                     ;���ڴ����
data ends

code segment
    assume cs:code,ds:data
start:
    mov ax,data
    mov ds,ax  
    mov bx,offset number       ;number�Ķ���ƫ�Ƶ�ַ
    
    mov cx,10                  ;cx ��¼��Ҫѭ���Ĵ���
    mov si,0
    
    call sort
    
    
    display:                   ;��ѭ������������������
    call dis                   ;����dis ��ӡ���
    add si,2                   ;si++
    
    mov dl,20h                 ;��ÿ�����ֺ�����ո�
    mov ah,2
    int 21h
    
    loop display
    
    
    mov ah,4ch
    int 21h          

    
    
    
    ;�ӳ���sort������ʵ��ð������
    sort proc
    
    push ax
    push bx
    push cx
    push si
    
    dec cx                     ;cx--
    
    ;ð��������ѭ��
    outsl:
    
    push cx                    ;����cx
    mov si,0                   ;si ��0
    
    ;ð��������ѭ��
    insl:
    mov ax,[bx][si]            ;Ѱַ         
    cmp ax,[bx][si+2]          ;��һ�����ֱȽ�
    jc nextl                   ;���ڡ�����������
    xchg ax,[bx][si+2]         ;С���򽻻�
    mov [bx][si],ax     
    nextl:
    add si,2                   ;si++
    loop insl
    
    pop cx
    loop outsl
     
     
    pop si
    pop cx
    pop bx
    pop ax    
    
    ret
    sort endp





    ;�ӳ���dis�����ڸ������ֵĴ�ӡ���
    dis proc
    
    push ax
    push bx
    push si
    push cx    
    
    mov ax,[bx][si]            ;Ѱַ ��ַ�ӱ�ַ
    mov cl,10
    mov si,0                   ;��ŽǱ�
    
    div10:                     ;ͨ��ѭ������10��������λ��¼����
    div cl                     ;ax / cl ������ah ����al 
    mov x[si],ah               ;�������
    inc si                      ;si++
    mov ah,0                    ;��������
    cmp ax,0                   ;�Ƚ����Ƿ�Ϊ0
    jne div10                  ;ѭ������10����Ϊ0
    mov cx,si               
    
    disl:                      ;ѭ�������ӡ����
    dec si                     ;����x[0]�� x[si-1]
    mov dl,x[si]            
    add dl,30h                 ;ASCLL���48��ʼ����48���������
    mov ah,2
    int 21h
    loop disl                  ;ѭ������10
    
    pop cx
    pop si
    pop bx
    pop ax
    
    ret
    dis endp

CODE ENDS
     END START
#pragma warning(disable:4996)

#include<stdio.h>
#include<stdlib.h>

#define max 100
#define vertex 16

void print(int b, int e, int path[]) {
    if (e == b) {
        printf("%d", b);
        return;
    }
    else {
        print(b, path[e], path);
        printf(" --> %d", e);
    }
}

void path(int a[][vertex]) {
    int i, j, k, b, e, min;
    int w[vertex];
    int path[vertex];
    int temp[vertex];

    printf("pleast input the beginning point.\n");						//输入起始点
    scanf("%d", &b);

    for (i = 0; i < vertex; i++) {
        w[i] = a[b][i];
        if (w[i] < max && w[i] > 0)
            path[i] = b;
        temp[i] = 0;
    }

    temp[b] = 1;
    w[b] = 0;
    k = b;

    for (i = 0; i < vertex; i++) {
        min = max;
        for (j = 0; j < vertex; j++) {
            if (temp[j] == 0 && w[j] < min) {
                min = w[j];
                k = j;
            }
        }

        temp[k] = 1;
        for (j = 0; j < vertex; j++) {
            if (temp[j] == 0 && w[k] + a[k][j] < w[j]) {
                w[j] = w[k] + a[k][j];
                path[j] = k;
            }
        }
    }

    printf("please input the ending point.\n");						//输入结束的点
    scanf("%d", &e);

    print(b, e, path);
}

void init(int a[][vertex]) {   									//图结构的初始化
    for (int i = 0; i < vertex; i++)
        for (int j = 0; j < vertex; j++)
            a[i][j] = max;
    a[0][1] = 5; a[0][2] = 3;
    a[1][0] = 5; a[1][3] = 1; a[1][4] = 3; a[1][5] = 6;
    a[2][0] = 3; a[2][4] = 8; a[2][5] = 7; a[2][6] = 6;
    a[3][1] = 1; a[3][7] = 6; a[3][8] = 8;
    a[4][1] = 3; a[4][7] = 3; a[4][8] = 5;
    a[5][1] = 5; a[5][2] = 7; a[5][8] = 3; a[5][9] = 3;
    a[6][2] = 6; a[6][8] = 8; a[6][9] = 4;
    a[7][3] = 6; a[7][4] = 3; a[7][10] = 2; a[7][11] = 2;
    a[8][3] = 8; a[8][4] = 5; a[8][5] = 3; a[8][6] = 3; a[8][11] = 1; a[8][12] = 2;
    a[9][5] = 3; a[9][6] = 4; a[9][11] = 3; a[9][12] = 3;
    a[10][7] = 2; a[10][13] = 3; a[10][14] = 5;
    a[11][7] = 2; a[11][8] = 1; a[11][9] = 3; a[11][13] = 5; a[11][14] = 2;
    a[12][8] = 2; a[12][9] = 3; a[12][13] = 6; a[12][14] = 6;
    a[13][10] = 3; a[13][11] = 5; a[13][12] = 6; a[13][15] = 4;
    a[14][10] = 5; a[14][11] = 2; a[14][12] = 6; a[14][15] = 3;
    a[15][13] = 4; a[15][14] = 3;
}

int main() {
    int a[vertex][vertex];
    init(a);
    path(a);
    printf("\n");
    system("pause");
    return 0;
}
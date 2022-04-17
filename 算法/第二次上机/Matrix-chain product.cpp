#pragma warning(disable:4996)

#include<stdio.h>
#include<stdlib.h>
#define SIZE 10
#define MAX 999999
int m[SIZE][SIZE], s[SIZE][SIZE];
int Matrix_chain_order(int p[]) {
	int n = p[0] - 1;
	for (int i = 1; i <= n; ++i) {
		m[i][i] = 0;
	}
	for (int l = 2; l <= n; ++l) {
		for (int i = 1, j; i <= n - l + 1; ++i) {
			j = i + l - 1;
			m[i][j] = MAX;
			for (int k = i; k <= j - 1; ++k) {
				int q = m[i][k] + m[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
				if (q < m[i][j]) {
					m[i][j] = q;
					s[i][j] = k;
				}
			}
		}
	}
	return 0;
}
int Print_Optimal_Parens(int i, int j) {
	if (i == j)printf("A");
	else {
		printf("(");
		Print_Optimal_Parens(i, s[i][j]);
		Print_Optimal_Parens(s[i][j] + 1, j);
		printf(")");
	}
	return 0;
}
int main() {
	int p[SIZE + 1];

	int size;
	printf("input the size of the chain:\n");
	scanf("%d", &size);
	if (size > SIZE) {
		printf("the size is too big!\n");
		system("pause");
		return 0;
	}
	p[0] = size;
	printf("please input the chain:");
	for (int i = 1, j; i <= size; ++i) {
		scanf("%d", &j);
		p[i] = j;
	}
	Matrix_chain_order(p);
	Print_Optimal_Parens(1, size - 1);
	printf("\n");
	system("pause");
	return 0;
}
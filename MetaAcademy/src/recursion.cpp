/* 
 * TODO: put your own comments here. Also you should leave comments on
 * each of your methods.
 */

#include <math.h>
#include "recursion.h"
#include "map.h"
#include "vector.h"
#include "set.h"
#include "gwindow.h"
#include "gobjects.h"
#include "tokenscanner.h"
using namespace std;

int gcd(int a, int b);
void serpinskii(GWindow &w, int leftX, int leftY, int size, int order);
void serpinskiiHelper(GWindow &w, int leftX, int leftY, int size, int order);
double calculateheight(double size);
int floodFill(GBufferedImage& image, int x, int y, int newColor);
int fillColor(GBufferedImage& image, int x, int y, int newColor, int pixel);
void personalCurriculum(Map<string, Vector<string>> & prereqMap,string goal);
void curriculumHelper(Map<string, Vector<string>> & prereqMap, string goal, Set<string> & printed);
string generate(Map<string, Vector<string> > & grammar, string symbol);
string random(Vector<string> vector);

/************************************
 *    Greatest Common Denominator   *
 ************************************/

int gcd(int a, int b) {
    if (a % b !=0) {
        cout << "gcd(" << a << "," << b << ") = gcd(" << b << "," << a % b << ")" <<endl;
        return gcd(b, a%b);
    }else{
        cout << "gcd(" << a << "," << b << ") = gcd(" << b <<", 0)"<<endl;
        cout << "gcd(" << b <<", 0)"<< "= " << b <<endl;
         return b;
    }
}

/************************************
 *        Serpinskii Fractal        *
 ************************************/
void serpinskii(GWindow &w, int leftX, int leftY, int size, int order){
    double dX = leftX;
    double dY = leftY;
    double dSize = size;

    serpinskiiHelper(w, dX, dY, dSize, order);
}

double calculateheight(double size){
    return (size * sqrt(3)) / 2;
}

void serpinskiiHelper(GWindow &w, int leftX, int leftY, int size, int order) {
    double height = calculateheight(size);

    if (order == 1) {
            w.drawLine(leftX, leftY, leftX + size, leftY); //gw.drawLine(x1, y1, x2, y2);
            w.drawLine(leftX, leftY, leftX + size / 2, leftY + height);
            w.drawLine(leftX + size, leftY, leftX + size / 2, leftY + height);
        }
        else if (order > 1) {
            serpinskii(w, leftX, leftY, size / 2, order - 1);
            serpinskii(w, leftX + size / 2, leftY, size / 2, order - 1);
            serpinskii(w, leftX + size / 4, leftY + height/ 2, size / 2, order - 1);
        }
}

/************************************
 *            Flood Fill            *
 ************************************/

int floodFill(GBufferedImage& image, int x, int y, int newColor) {
   int pixel = image.getRGB(x, y);
   if(pixel != newColor){
        return fillColor(image, x, y, newColor, pixel);
   }
   return 0;
}

int fillColor(GBufferedImage& image, int x, int y, int newColor, int pixel) {
    int count;

    if(image.inBounds(x, y) && pixel == image.getRGB(x, y)){
        image.setRGB(x, y, newColor);
        count++;
        fillColor(image, x-1, y, newColor, pixel);
        fillColor(image, x+1, y, newColor, pixel);
        fillColor(image, x, y+1, newColor, pixel);
        fillColor(image, x, y-1, newColor, pixel);
}
    return count;
}

/************************************
 *     Personalized Curriculum      *
 ************************************/

void curriculumHelper(Map<string, Vector<string>> & prereqMap, string goal, Set<string> & printed) {
//    allPrereqsOfConcept(prereqMap, concept){
//        it's direct prerequisites and
//        for (childConcept : direct prerequisites){
//            allPrereqsOfConcept(prereqMap, childConcept)
//        }
//    }

    if(prereqMap.containsKey(goal)){
        for(string chilConcept : prereqMap[goal]){
            curriculumHelper(prereqMap,chilConcept, printed);
        }
    }if (!printed.contains(goal)) {
        cout << goal << endl;
        printed.add(goal);
    }
}

void personalCurriculum(Map<string, Vector<string>> & prereqMap,string goal) {
    Set<string> printed;
    curriculumHelper(prereqMap, goal, printed);
}

/************************************
 *         Generate Question        *
 ************************************/

//TokenScanner scanner(production);
//while (scanner.hasMoreTokens()) {
//   string token = scanner.nextToken();
//   // do something with token
//}
string random(Vector<string> vector){
    int getRan = randomInteger(0, (vector.size() - 1));
    string i = vector[getRan];

    return i;
}

string generate(Map<string, Vector<string> > & grammar, string symbol) {
    string words;

    if(grammar.containsKey(symbol)){
        string option = random(grammar[symbol]);
        TokenScanner scanner(option);
        while(scanner.hasMoreTokens()){
            string token = scanner.nextToken();
            words += generate(grammar, token);
        }} else
            words += symbol;

    return words;
    }

